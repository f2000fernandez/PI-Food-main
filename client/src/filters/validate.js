
const validate = ({title, summary, spoonacularScore, healthScore, instructions}, diets) => {
    let errors = {};

    if(!title || title === "") errors.title = "A name is required";

    if(!summary || summary === "") errors.summary = "A summary is required";

    if(!spoonacularScore || spoonacularScore === "") errors.spoonacularScore = "A score is required";
    else if (isNaN(Number(spoonacularScore))) errors.spoonacularScore = "Score must be a number"
    else if(spoonacularScore > 100 || spoonacularScore < 0) errors.spoonacularScore = "Score must be between 0 and 100"

    if(!healthScore || healthScore === "") errors.healthScore = "A health score is required";
    else if (isNaN(Number(healthScore))) errors.healthScore = "Health score must be a number"
    else if(healthScore > 100 || healthScore < 0) errors.healthScore = "Health score must be between 0 and 100"

    if(!instructions || instructions === "") errors.instructions = "Instructions are required";

    if(diets.length === 0) errors.diets = "Pick at least one diet";
    
    return errors;
}

export default validate;