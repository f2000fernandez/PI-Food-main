import './App.css';
import React, { useEffect } from 'react';
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Recipes from "./components/Recipes";
import Home from './components/Home';
import RecipeDetail from "./components/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe";
import { getDiets } from "./redux/actions"
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDiets);
  }, [])

  return (
    <div className="App">
      <Route exact path="/" render={() => <Landing/>} />
      <Route path="/recipe" render={() => <Home/>} />
      <Route exact path="/recipes" render={() => <Recipes/>} />
      <Route exact path="/recipes/:recipeId" render={() => <RecipeDetail/>} />
      <Route exact path="/recipe/create" render={() => <CreateRecipe/>} />
    </div>
  );
}

export default App;
