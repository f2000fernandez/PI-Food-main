import { GET_ALL_RECIPES, CREATE_RECIPE, GET_RECIPE, FILTER_RECIPES, ORDER_RECIPES } from './actions.js'
import filterStoreRecipes from '../filters/filterRecipes';
import orderStoreRecipes from '../filters/orderRecipes';

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
                recipes: state.recipes.unshift(action.payload)
            };

        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };
        
        case FILTER_RECIPES:
            return {
                ...state,
                recipes: filterStoreRecipes(state.recipes, action.payload)
            }

        case ORDER_RECIPES:
            return {
                ...state,
                recipes: orderStoreRecipes(state.recipes, action.payload)
            }
            
        default: 
            return {...state}
    };
}

export default rootReducer;