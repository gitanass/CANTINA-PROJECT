import React from 'react';
import { Redirect, Route } from "react-router-dom";
import ViewRecipe from '../pages/ViewRecipe';

const AppRoutes = () => {
    return (
      <>
        <Route path="/" exact component={ViewRecipe} />
      </>
    );
  };

  export default AppRoutes;