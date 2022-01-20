require('dotenv').config();
const axios = require('axios');
const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');
const {
    API_KEY,
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const apiComplexSearch = async function(query) {
    let apiData;
    if(query) {
        apiData = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&addRecipeInformation=true`);
    } else {
        apiData =await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
    }
    return apiData.data.results.map(e => {return {id: e.id, spoonacularScore: e.spoonacularScore, healthScore: e.healthScore, image: e.image, summary: e.summary, diets: e.diets, analyzedInstructions: e.analyzedInstructions} })
}

const apiInformation = async function(id) {
    let apiData = await axios.get(`https://api.spoonacular.com/recipes/${id}/information&apiKey=${API_KEY}`);
    return {spoonacularScore: apiData.spoonacularScore, healthScore: apiData.healthScore}
}

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    
});

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
});

router.get('/types', async (req, res) => {
    let dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]
    let dietas = await Promise.all(dietsArray.map(async (dieta) => {
        const [diet, created] = await Diet.findOrCreate({
            where: {name: dieta}
        });
        console.log(diet.dataValues.name);
        return diet.dataValues.name;
    }));
    res.json(dietas);
});

router.post('/recipe', async (req, res) => {
    const {name, summary, spoonacularScore, healthScore, steps, diet} = req.body;
    let newRecipe = await Recipe.create({
        name,
        summary,
        spoonacularScore,
        healthScore,
        steps
    });
    let recipe = newRecipe;
    if(diet) {
        let dieta = await Diet.findAll({where: {name: diet}})
        await newRecipe.addDiet(dieta[0].dataValues.id);
        recipe = await Recipe.findAll({include: Diet, where: {name:name}})
    }
    res.json(recipe);
});

module.exports = router;
