import React from "react";
import { Link } from "react-router-dom";
import './estilos/RecipeCard.css'

const RecipeCard = ({id, image, title, diets}) => {
    return (
        <div className="card">
            <img className="img" src={image} alt="no picture found"/>
            <h3>
                <Link className="name" to={`/recipes/${id}`}>{title}</Link>
            </h3>
            {
                diets && <ul className="dietList" aria-label="Diets:">
                    {diets.map((diet, index) => <li className="diet" key={index}>{diet}</li>)}   
                </ul> 
            }
        </div>
    )
}

export default RecipeCard