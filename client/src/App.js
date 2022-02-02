import './App.css';
import React from 'react';
import { Route } from "react-router-dom";
import Landing from "./components/Landing";
import Recipes from "./components/Recipes";
import RecipeDetail from "./components/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe";

function App() {

  return (
    <div className="App">
      <Route exact path="/" render={() => <Landing/>} />
      <Route exact path="/recipes" render={() => <Recipes/>} />
      <Route exact path="/recipes/:recipeId" render={() => <RecipeDetail/>} />
      <Route exact path="/recipe/create" render={() => <CreateRecipe/>} />
    </div>
  );
}

export default App;
