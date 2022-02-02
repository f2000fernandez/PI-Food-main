import React from "react";
import { Link } from "react-router-dom";
import './estilos/RecipeCard.css'

const RecipeCard = ({id, image, title, diets}) => {
    return (
        <div className="card">
            <img className="img" src={image} alt="no picture found"/>
            <h3>
                <Link to={`/recipes/${id}`}>{title}</Link>
            </h3>
            {
                diets && diets.map((diet, index) => <p key={index}>{diet}</p>)   
            }
        </div>
    )
}

export default RecipeCard