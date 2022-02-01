import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllRecipes, getRecipeName, filterRecipes, orderRecipes, getBackupRecipes, getDiets } from "../redux/actions";
import RecipeCard from "./RecipeCard";
import Paginado from "./Paginado";
// import './estilos/Paginado.css';

const Recipes = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState('')
    const {recipes, backup, diets} = useSelector((state) => state)
    
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const lastRecipe = currentPage * recipesPerPage;
    const firstRecipe = lastRecipe - recipesPerPage;
    const pagedRecipes = recipes.slice(firstRecipe, lastRecipe);

    function handleInputChange(event) {
        let input = event.target.value;
        event.preventDefault();
        setInput(input);
    }

    function handleSearch(event) {
        event.preventDefault();
        if(backup.length > 0)dispatch(getBackupRecipes())
        dispatch(getRecipeName(input))
        setInput('');
    }

    function handleClear(event) {
        event.preventDefault();
        if(backup.length > 0) dispatch(getBackupRecipes())
    }

    function handleOrderChange(event) {
        let order = event.target.value;
        event.preventDefault();
        dispatch(orderRecipes(order))
    }

    function handleFilterChange(event) {
        let filter = event.target.value;
        event.preventDefault();
        if(backup.length > 0) dispatch(getBackupRecipes());
        if(filter !== "noFilter") dispatch(filterRecipes(filter));
    }

    React.useEffect(() => {
        if(diets.length === 0)dispatch(getDiets())
        if(recipes.length === 0) dispatch(getAllRecipes());
    }, []) 
    
    return (
        <div>
            <Link to='/recipe/create'><h1>Create new recipe!</h1></Link>

            <form onSubmit={handleSearch}>
                <label>Search: </label>
                <input value={input} onChange={handleInputChange} />
                <button type="submit">Search</button>
                <button onClick={handleClear}>Clear</button>
            </form>

            <select onChange={(e) => handleOrderChange(e)}>
                <option value="" disabled selected hidden>Order by</option>
                <option value="A-Z">Order A-Z</option>
                <option value="Z-A">Order Z-A</option>
                <option value="SS0-100">Order ascending score</option>
                <option value="SS100-0">Order descending score</option>
                <option value="HS0-100">Order ascending health score</option>
                <option value="HS100-0">Order descending health score</option>
            </select>

            <select onChange={(e) => handleFilterChange(e)}>
                <option value="noFilter">No filter</option>
                {diets.length > 0 && diets.map((diet, index) => (
                    <option key={index} value={diet}>{diet}</option>
                ))}
            </select>      

            {
                recipes.length > 0 && <Paginado recipesPerPage={recipesPerPage} recipes={recipes.length} setCurrentPage={setCurrentPage} />
            }


            <h3>Recipes:</h3>
            {
                pagedRecipes.length > 0 && pagedRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} diets={recipe.diets} />    
                    )
                )
            }

        </div>
    )
}

export default Recipes;