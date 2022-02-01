import { GET_ALL_RECIPES, CREATE_RECIPE, GET_RECIPE, FILTER_RECIPES, ORDER_RECIPES, DELETE_RECIPE, GET_DIETS } from './actions.js'
import filterStoreRecipes from '../filters/filterRecipes';
import orderStoreRecipes from '../filters/orderRecipes';

const initialState = {
    recipes: [],
    backup: [],
    recipe: {},
    diets: {}
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
                recipes: [action.payload, ...state.recipes]
            };

        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }

        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };

        case DELETE_RECIPE:
            return {
                ...state,
                recipe: {}
            }
        
        case FILTER_RECIPES:
            return {
                ...state,
                backup: state.recipes,
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