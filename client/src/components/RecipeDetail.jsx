import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getRecipe, deleteRecipe } from "../redux/actions";
import Home from "./Home";

const RecipeDetail = () => {

    const {recipeId} = useParams();
    const {recipe} = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipe(recipeId));
        return dispatch(deleteRecipe())
    }, [dispatch, recipeId])

    if (Object.keys(recipe).length === 0) return (
        <div>
            <h1>LOADING</h1>
        </div>
    )

    return (
        <div>
            <Home/>
            <img src={recipe.image} alt="no picture found"/>
            <h2>{recipe.title}</h2>
c            <div dangerouslySetInnerHTML={{__html: `${recipe.summary}`}} />
            <h2>{recipe.spoonacularScore}</h2>
            <h2>{recipe.healthScore}</h2>
            {
                recipe.diets && <ul>
                    {
                        recipe.diets.map((diet, index) => <li key={index}>{diet}</li>)
                    }
                </ul>
            }
            <div dangerouslySetInnerHTML={{__html: `${recipe.instructions}`}} />
        </div>
    )

}

export default RecipeDetail;