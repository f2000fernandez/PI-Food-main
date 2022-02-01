import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({id, image, title, diets}) => {
    let key = 0;
    return (
        <div>
            <img src={image} alt="no picture found"/>
            <h3>
                <Link to={`/recipes/${id}`}>{title}</Link>
            </h3>
            {
                diets && <ul>
                    {
                        diets.map(diet => <li key={key++}>{diet}</li>)
                    }
                </ul>
            }
        </div>
    )
}

export default RecipeCard