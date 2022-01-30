import axios from 'axios';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const GET_RECIPE = 'GET_RECIPE';
export const GET_DIETS = 'GET_DIETS';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const FILTER_RECIPES = "FILTER_RECIPES";
export const ORDER_RECIPES = "ORDER_RECIPES";

const URL = "localhost:3001";

export const getAllRecipes = function() {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/recipes`);
        dispatch({ type: GET_ALL_RECIPES, payload: response })
    }
}

export const getRecipeName = function(name) {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/recipes&name=${name}`)
        dispatch({ type: GET_RECIPE_NAME, payload: response })
    }
}

export const getRecipe = function(id) {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/recipes/${id}`)
        dispatch({ type: GET_RECIPE, payload: response })
    }
}

export const filterRecipes = function(type) {
    return { type: FILTER_RECIPES, payload: type }
}

export const orderRecipes = function(type) {
    return { type: ORDER_RECIPES, payload: type }
}

export const getDiets = function() {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/types`);
        dispatch({ type: GET_DIETS, payload: response })
    }
}

export const createRecipe = function({id, title, summary, spoonacularScore, healthScore, instructions, diets}) {
    return async (dispatch) => {
        const post = axios.post(`${URL}/recipe`, {
            id,
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            diets
        })
        dispatch({ type: CREATE_RECIPE, payload: post })
    }
}
