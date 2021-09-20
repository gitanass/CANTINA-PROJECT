import React from "react";
import { Redirect, Route } from "react-router-dom";
import ViewRecipe from "../pages/ViewRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import AddRecipe from "../pages/AddRecipe";

const AppRoutes = () => {
  return (
    <>
      <Route path="/" exact component={ViewRecipe} />
      <Route path="/recipe/:id" exact component={RecipeDetails} />
      <Route path="/addRecipe" exact component={AddRecipe} />
    </>
  );
};

export default AppRoutes;
