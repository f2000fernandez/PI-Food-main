import React from "react";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createRecipe } from "../redux/actions";

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
    
    const [input, setInput] = React.useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        instructions: "",
        diets: []
    })

    const [diets, setDiets] = React.useState({
        diets: []
    })

    let recipes = useSelector((state) => state.recipes)

    useEffect(() => {
        console.log(recipes)
    },[recipes])

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
    }

    function handleSubmit(event) {
        event.preventDefault();
        setInput({
            ...input,
            diets: diets.diets.map(diet => diet.value)
        })
    }

    useEffect(() => {
        if(input.diets.length > 0) dispatch(createRecipe(input))
    }, [input.diets])

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <input name="title" value={input.title} onChange={handleChange} />

                <label>Summary:</label>
                <input name="summary" value={input.summary} onChange={handleChange} />

                <label>Score:</label>
                <input name="spoonacularScore" value={input.spoonacularScore} onChange={handleChange} />

                <label>Health score:</label>
                <input name="healthScore" value={input.healthScore} onChange={handleChange} />

                <label>Instructions:</label>
                <input name="instructions" value={input.instructions} onChange={handleChange} />

                <Select
                    isMulti
                    value={diets.diets}
                    onChange={handleSelectChange}
                    options={dietOptions}
                />

                <button type='submit'>Create recipe!</button>
            </form>
        </div>
    )

}

export default CreateRecipe;