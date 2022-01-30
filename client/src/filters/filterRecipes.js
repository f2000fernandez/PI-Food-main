
function containsDiet(diets, dietType) {
    let found = diets.find(element => {
        typeof element === 'object' ? element.name === dietType : element === dietType
    })
    return !!found
}

export default filterStoreRecipes = function(recipes, dietType) {
    return recipes.filter(recipe => containsDiet(recipe.diets, dietType))
}