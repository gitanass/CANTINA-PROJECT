import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { convertMinsToHours } from "../helpers/utilities";
import DeleteRecipeModal from "./DeleteRecipeModal";
import { history } from "../index";

const RecipeDetails = (props) => {
  const classes = useStyles();
  const [recipe, setRecipe] = useState({});
  const [isPageError, setPageError] = useState(false);
  const [openDeleteModal, setDeleteModalVisibility] = useState(false);

  useEffect(() => {
    getRecipeInfo();
  }, []);

  const getRecipeInfo = () => {
    setPageError(false);
    const url = "http://localhost:9000/api/recipe/" + props.match?.params?.id;
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data);
        setRecipe(resp.data);
        setPageError(false);
      })
      .catch((error) => {
        console.log(error);
        setPageError(true);
      });
  };

  const deleteRecipe = (id) => {
    axios
      .delete("http://localhost:9000/api/recipe/" + id)
      .then((resp) => {
        console.log(resp.data);
        history.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderIngradiants = (info, index) => {
    return (
      <Typography
        variant="subtitle2"
        color="textSecondary"
        key={index.toString()}
      >
        {info[0] + " " + info[1]}
      </Typography>
    );
  };

  const renderSteps = (info, index) => {
    return (
      <Typography
        variant="subtitle2"
        color="textSecondary"
        key={index.toString()}
      >
        {index + 1 + ". " + info}
      </Typography>
    );
  };

  return (
    <div style={{ display: "inline-block" }}>
      <DeleteRecipeModal
        openModal={openDeleteModal}
        onCloseModal={() => {
          setDeleteModalVisibility(false);
        }}
        onDeleteRecipeCallback={() => {
          deleteRecipe(recipe.id);
          setDeleteModalVisibility(false);
        }}
      />
      {isPageError ? (
        <div> Error while fetching the recipe</div>
      ) : (
        <Card className={classes.root}>
          <div className={classes.details}>
            <img className={classes.cover} src={recipe?.photo} />
            <CardContent className={classes.content}>
              <div>
                <Typography variant="subtitle1" color="textSecondary">
                  {recipe?.titre}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {recipe?.description}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <span>Niveau : </span>
                  <span>{recipe?.niveau}</span>
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <span>Personnes : </span>
                  <span>{recipe?.personnes}</span>
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <span>Temps de preparation : </span>
                  <span>{convertMinsToHours(recipe?.tempsPreparation)}</span>
                </Typography>
              </div>
              <div>
                <Typography variant="h5" color="textSecondary">
                  Ingredients
                </Typography>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  {recipe?.ingredients?.map((each, index) =>
                    renderIngradiants(each, index)
                  )}
                </div>
              </div>
              <div>
                <Typography variant="h5" color="textSecondary">
                  étapes
                </Typography>
                <div style={{}}>
                  {recipe?.etapes?.map((each, index) =>
                    renderSteps(each, index)
                  )}
                </div>
              </div>
              <div className={classes.controls}>
                <div className={classes.buttonRoot}>
                  <Button variant="contained" color="primary">
                   Modifier
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setDeleteModalVisibility(true);
                    }}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RecipeDetails;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0.5rem",
  },
  buttonRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cover: {
    //width: 'auto',
    width: "auto",
    //height:250
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
