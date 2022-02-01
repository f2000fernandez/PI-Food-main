import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes, getRecipeName, filterRecipes, orderRecipes } from "../redux/actions";
import RecipeCard from "./RecipeCard";

const Recipes = () => {

    let dispatch = useDispatch();
    let {recipes, backup, diets } = useSelector((state) => state)

    function handleOrderChange(e) {
        console.log(e);
        //dispatch(orderRecipes())
    }

    React.useEffect(() => {
        if(recipes.length === 0) dispatch(getAllRecipes());
    }, []) 
    
    return (
        <div>
            <Link to='/recipe/create'><h1>Create new recipe!</h1></Link>
            <select onChange={(e) => handleOrderChange(e)}>
                <option value="A-Z">Order A-Z</option>
                <option value="Z-A">Order Z-A</option>
                <option value="SS0-100">Order ascending score</option>
                <option value="SS100-0">Order descending score</option>
                <option value="HS0-100">Order ascending health score</option>
                <option value="HS100-0">Order descending health score</option>
            </select>
            {/* <select onChange={}>
                <option value="">filter by</option>
                {
                    
                }
            </select>             */}
            <h3>Recipes:</h3>
            {
                recipes && recipes.map(recipe => (
                    <RecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} diets={recipe.diets} />    
                    )
                )
            }
        </div>
    )
}

export default Recipes;