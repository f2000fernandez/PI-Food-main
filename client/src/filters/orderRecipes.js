
function orderByName(recipes, order) {
    return recipes.sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (order === 'ascending') {
            if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
        } else {
            if (nameA > nameB) {
                return -1;
              }
              if (nameA < nameB) {
                return 1;
              }
              return 0;
        }
    });
}

function orderByScore(recipes, order, score) {
    return recipes.sort(function (a, b) {
        if (order === 'ascending') return a[score] - b[score];
        return b[score] - a[score]
    });
    
}

function orderStoreRecipes(recipes, type) {
    switch (type) {
        case "A-Z":
            return orderByName(recipes, 'ascending');
        case "Z-A":
            return orderByName(recipes, 'descending');
        case "SS0-100":
            return orderByScore(recipes, 'ascending', "spoonacularScore");
        case "SS100-0":
            return orderByScore(recipes, 'descending', "spoonacularScore");
        case "HS0-100":
            return orderByScore(recipes, 'ascending', "healthScore");
        case "HS100-0":
            return orderByScore(recipes, 'descending', "healthScore");
        default: return "invalid sorting";
    }
}

export default orderStoreRecipes