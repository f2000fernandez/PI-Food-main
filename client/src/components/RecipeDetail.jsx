import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRecipe, deleteRecipe } from "../redux/actions";

const RecipeDetail = () => {

    const {recipeId} = useParams();
    const {recipe} = useSelector((state) => state)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecipe(recipeId));
        return function cleanup() {
            dispatch(deleteRecipe())
        };
    }, [dispatch, recipeId])

    React.useEffect(() => {
        console.log(recipe)
    }, [recipe])

    if (Object.keys(recipe).length === 0) return (
        <div>
            <h1>LOADING</h1>
        </div>
    )

    return (
        <div>
            <img src={recipe.image} alt="no fucking picture found"/>
            <h2>{recipe.title}</h2>
c            <div dangerouslySetInnerHTML={{__html: `${recipe.summary}`}} />
            <h2>{recipe.spoonacularScore}</h2>
            <h2>{recipe.healthScore}</h2>
            {
                recipe.diets && <ul>
                    {
                        recipe.diets.map(diet => <li key={recipe.id}>{diet}</li>)
                    }
                </ul>
            }
            <div dangerouslySetInnerHTML={{__html: `${recipe.instructions}`}} />
        </div>
    )

}

export default RecipeDetail;