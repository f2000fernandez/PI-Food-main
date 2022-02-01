
function filterStoreRecipes(recipes, dietType) {
    return  recipes.filter(recipe => recipe.diets.findIndex(diet => diet === dietType) !== -1 )
}

export default filterStoreRecipes