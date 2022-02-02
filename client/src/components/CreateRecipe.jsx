import React, { useState } from "react";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createRecipe } from "../redux/actions";
import Home from "./Home";
import validate from "../filters/validate";
import './estilos/CreateRecipe.css'

const dietOptions = [
    { value: 'Gluten Free', label: 'Gluten Free' },
    { value: 'Ketogenic', label: 'Ketogenic' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Lacto-Vegetarian', label: 'Lacto-Vegetarian' },
    { value: 'Ovo-Vegetarian', label: 'Ovo-Vegetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Pescetarian', label: 'Pescetarian' },
    { value: 'Paleo', label: 'Paleo' },
    { value: 'Primal', label: 'Primal' },
    { value: 'Low FODMAP', label: 'Low FODMAP' },
    { value: 'Whole30', label: 'Whole30' },
]

const CreateRecipe = () => {
    
    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        instructions: "",
        diets: []
    })

    const [errors, setErrors] = useState({})

    const [diets, setDiets] = useState({
        diets: []
    })

    const dispatch = useDispatch();

    function handleSelectChange(diets) {
        setDiets({
            diets: diets
        })
    }

    function handleChange(event) {
        event.preventDefault();
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setErrors(validate(input, diets))
    }

    function handleSubmit(event) {
        event.preventDefault();
        setInput({
            ...input,
            diets: diets.diets.map(diet => diet.value)
        })
    }

    useEffect(() => {
        if(input.diets.length > 0) {
            dispatch(createRecipe(input))
            alert('Recipe has been created!')
        }
    }, [input.diets])

    return (
        <div>
            <Home />
            <form className="form" onSubmit={handleSubmit}>
               
                <div className="inputs">
                    <label>Name:</label>
                    <input name="title" value={input.title} onChange={handleChange} />
                    {errors.title && <span>{errors.title}</span>}
                </div>

                <div className="inputs">
                    <label>Summary:</label>
                    <input className="inputs" name="summary" value={input.summary} onChange={handleChange} />
                    {errors.summary && <span>{errors.summary}</span>}
                </div>

                <div className="inputs">
                    <label>Score:</label>
                    <input className="inputs" name="spoonacularScore" value={input.spoonacularScore} onChange={handleChange} />
                    {errors.spoonacularScore && <span>{errors.spoonacularScore}</span>}
                </div>

                <div className="inputs">
                    <label>Health score:</label>
                    <input className="inputs" name="healthScore" value={input.healthScore} onChange={handleChange} />
                    {errors.healthScore && <span>{errors.healthScore}</span>}
                </div>

                <div className="inputs">
                    <label>Instructions:</label>
                    <input className="inputs" name="instructions" value={input.instructions} onChange={handleChange} />
                    {errors.instructions && <span>{errors.instructions}</span>}
                </div>
                
                <div className="inputs">
                    <Select
                        isMulti
                        value={diets.diets}
                        onChange={handleSelectChange}
                        options={dietOptions}
                    />
                    {errors.diets && <span>{errors.diets}</span>}
                </div>


                <button type='submit' disabled={Object.keys(errors).length > 0}>Create recipe!</button>
            </form>
        </div>
    )

}

export default CreateRecipe;