import { GET_ALL_RECIPES, CREATE_RECIPE, GET_RECIPE, FILTER_RECIPES, ORDER_RECIPES } from './actions.js'
import filterRecipes from '../../filters/filterRecipes';
import orderRecipes from '../../filters/orderRecipes';

const initialState = {
    recipes: [],
    recipe: {},
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };

        case CREATE_RECIPE:
            return {
                ...state,
                recipes: recipes.unshift(action.payload)
            };

        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };
        
        case FILTER_RECIPES:
            return {
                ...state,
                recipes: filterRecipes(recipes, action.payload)
            }

        case ORDER_RECIPES:
            return {
                ...state,
                recipes: orderRecipes(recipes, action.payload)
            }
            
        default: 
            return {...state}
    };
}

export default rootReducer;