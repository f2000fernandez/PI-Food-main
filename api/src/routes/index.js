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
        apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&number=86`);
    } else {
        apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=86`);
    }
    return apiData.data.results.map(e => {return {id: e.id, title: e.title, spoonacularScore: e.spoonacularScore, healthScore: e.healthScore, image: e.image, diets: e.diets} })
}

const apiInformation = async function(id) {
    let {data} = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    return {
        title: data.title, spoonacularScore: data.spoonacularScore, healthScore: data.healthScore, instructions: data.instructions, image: data.image, summary: data.summary, diets: data.diets
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
        }
    });
    let dbRecipesDiets = await Promise.all( dbRecipes.map(async recipe =>{
        let diets = await recipe.getDiets();
        let dietnames = diets.map(diet => diet.name);
        return {...recipe.dataValues, diets: dietnames}
    })) 
    let apiRecipes = await apiComplexSearch(name);
    res.json([...dbRecipesDiets, ...apiRecipes]);
});

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
    let recipeInfo;
    if(id >= 0) {
        recipeInfo = await apiInformation(id);
    } else {
        let recipe = await Recipe.findByPk(id);
        let diets = await recipe.getDiets();
        let dietnames = diets.map(diet => diet.name);
        recipeInfo = {...recipe.dataValues, diets: dietnames}
    }
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
    if(diets.length > 0) {
        await Promise.all(diets.map(async (dieta) => {
            let diet = await Diet.findOne({where: {name: dieta}});
            await newRecipe.addDiet(diet.id);
        }));
    }
    res.json({...newRecipe.dataValues, diets});
});


module.exports = router;
