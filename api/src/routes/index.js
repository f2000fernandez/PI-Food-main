require('dotenv').config();
const axios = require('axios');
const e = require('express');
const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');
const { Op } = require("sequelize");
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const apiComplexSearch = async function(query) {
    let apiData;
    if(query) {
        apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=true`);
    } else {
        apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    }
    return apiData.data.results.map(e => {return {id: e.id, title: e.title, spoonacularScore: e.spoonacularScore, healthScore: e.healthScore, image: e.image, diets: e.diets} })
}

const apiInformation = async function(id) {
    console.log('IM HERE!!')
    let {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    console.log(data)
    return {
        title: data.title, spoonacularScore: data.spoonacularScore, healthScore: data.healthScore, instructions: data.instructions, image: data.image, summary: data.summary
    }
}

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    let dbRecipes = await Recipe.findAll({
        where: {
            title: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: [{
            model: Diet,
            through: {
              attributes: []
            }
          }]
    });
    let apiRecipes = await apiComplexSearch(name);
    res.json([...dbRecipes, ...apiRecipes]);
});

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
    let recipeInfo;
    if(id >= 0) {
        recipeInfo = await apiInformation(id);
    } else recipeInfo = await Recipe.findByPk(id);
    res.json(recipeInfo)
});

router.get('/types', async (req, res) => {
    let dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]
    let dietas = await Promise.all(dietsArray.map(async (dieta) => {
        const [diet, created] = await Diet.findOrCreate({
            where: {name: dieta}
        });
        return diet.dataValues.name;
    }));
    res.json(dietas);
});

router.post('/recipe', async (req, res) => {
    const {id, title, summary, spoonacularScore, healthScore, instructions, diets} = req.body;
    let newRecipe = await Recipe.create({
        id,
        title,
        summary,
        spoonacularScore,
        healthScore,
        instructions,
    });
    let recipe = newRecipe;
    if(diets) {
        await Promise.all(diets.map(async (dieta) => {
            let diet = await Diet.findOne({where: {name: dieta}});
            await newRecipe.addDiet(diet.id);
        })); 
        recipe = await Recipe.findOne({
            where: {title:title},
            include: [{
                model: Diet,
                through: {
                  attributes: []
                }
              }]
        })
    }
    res.json(recipe);
});


module.exports = router;
