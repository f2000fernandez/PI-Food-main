
function filterStoreRecipes(recipes, dietType) {
    if(typeof recipes[0].diets[0] === 'object') return recipes.filter(recipe => recipe.diets.findIndex(diet => diet.name === dietType) !== -1);
    return  recipes.filter(recipe => recipe.diets.findIndex(diet => diet === dietType) !== -1)
}

export default filterStoreRecipes