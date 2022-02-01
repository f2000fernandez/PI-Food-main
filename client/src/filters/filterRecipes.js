
function compareDiets(diet1, diet2) {
    if(diet1.toUpperCase() === diet2.toUpperCase()) return true;
    if(diet1 === "lacto ovo vegetarian" && diet2 === "Lacto-Vegetarian") return true
    if(diet1 === "lacto ovo vegetarian" && diet2 === "Ovo-Vegetarian") return true
    if(diet1 === "fodmap friendly" && diet2 === "low FODMAP") return true
    if(diet1 === "paleolithic" && diet2 === "Paleo") return true
    if(diet1 === "whole 30" && diet2 === "Whole30") return true
    if(diet1 === "pescatarian" && diet2 === "Pescetarian") return true
    return false;    
}

function filterStoreRecipes(recipes, dietType) {
    return  recipes.filter(recipe => recipe.diets.findIndex(diet => compareDiets(diet, dietType)) !== -1 )
}

export default filterStoreRecipes