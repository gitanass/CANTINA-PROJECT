import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { history } from "../index";
import { convertMinsToHours } from "../helpers/utilities";
import DeleteRecipeModal from "./DeleteRecipeModal";

const ViewRecipe = () => {
  const classes = useStyles();
  const [recipeList, setRecipeList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [openDeleteModal, setDeleteModalVisibility] = useState(false);
  const [recipeInfoToDelete, setRecipeInfoToDelete] = useState({});

  useEffect(() => {
    getRecipeList();
  }, []);

  const getRecipeList = () => {
    axios
      .get("http://localhost:9000/api/recipes")
      .then((resp) => {
        console.log(resp.data);
        setRecipeList(resp.data);
        setOriginalList(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRecipe = (id) => {
    axios
      .delete("http://localhost:9000/api/recipe/" + id)
      .then((resp) => {
        console.log(resp.data);
        getRecipeList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onTitleSearch = (event) => {
    if (event.target.value === "") {
      setRecipeList(originalList);
      return;
    }
    const filteredList = originalList.filter((x) =>
      x.titre.toLowerCase().includes(event.target.value.toLowerCase())
    );
    //console.log(filteredList);
    setRecipeList(filteredList);
  };

  const onDifficultyChange = (event) => {
    //console.log(event);
    if (event.target.value === "") {
      setRecipeList(originalList);
      return;
    }
    const filteredList = originalList.filter((x) =>
      x.niveau.toLowerCase().includes(event.target.value.toLowerCase())
    );
    //console.log(filteredList);
    setRecipeList(filteredList);
  };

  const onPreperationTimeSearch = (event) => {
    if (event.target.value === "") {
      setRecipeList(originalList);
      return;
    }
    const filteredList = originalList.filter(
      (x) => x.tempsPreparation <= event.target.value
    );
    //console.log(filteredList);
    setRecipeList(filteredList);
  };
  const onNumberOfPeopleChange = (event) => {
    if (event.target.value === "") {
      setRecipeList(originalList);
      return;
    }
    const filteredList = originalList.filter(
      (x) => x.personnes <= event.target.value
    );
    //console.log(filteredList);
    setRecipeList(filteredList);
  };

  const onClickOfRecipe = (recipeDetails) => {
    history.push("recipe/" + recipeDetails.id);
  };

  const renderCardView = (recipe, index) => {
    return (
      <Card className={classes.root} key={index.toString()}>
        <div className={classes.details}>
          <img
            className={classes.cover}
            src={recipe.photo}
            onClick={() => onClickOfRecipe(recipe)}
          />
          <CardContent className={classes.content}>
            <div onClick={() => onClickOfRecipe(recipe)}>
              <Typography variant="subtitle1" color="textSecondary">
                {recipe.titre}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {recipe.description}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <span>Niveau : </span>
                <span>{recipe.niveau}</span>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <span>Personnes : </span>
                <span>{recipe.personnes}</span>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <span>Temps de preparation : </span>
                <span>{convertMinsToHours(recipe.tempsPreparation)}</span>
              </Typography>
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
                    setRecipeInfoToDelete(recipe);
                  }}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  const renderFilter = () => {
    return (
      <div style={{}}>
        <Grid container spacing={3} style={{ alignItems: "center" }}>
          <Grid item xs={3}>
            <TextField
              label="Title"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              type="search"
              onChange={onTitleSearch}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" style={{ top: "-6px" }}>
                Niveau
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={"padawan"}
                label="Diffuculty Level"
                onChange={onDifficultyChange}
                style={{ height: "2.5rem" }}
              >
                <MenuItem value={"padawan"}>padawan</MenuItem>
                <MenuItem value={"jedi"}>jedi</MenuItem>
                <MenuItem value={"maitre"}>maitre</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Personnes"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              onChange={onNumberOfPeopleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Temps de praparation"
              id="outlined-size-small"
              defaultValue=""
              variant="outlined"
              size="small"
              type="number"
              onChange={onPreperationTimeSearch}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <div>
      <DeleteRecipeModal
        openModal={openDeleteModal}
        onCloseModal={() => {
          setDeleteModalVisibility(false);
          setRecipeInfoToDelete({});
        }}
        onDeleteRecipeCallback={() => {
          deleteRecipe(recipeInfoToDelete.id);
          setDeleteModalVisibility(false);
          setRecipeInfoToDelete({});
        }}
      />
      <AppBar
        position="static"
        style={{
          backgroundColor: "#b19eef",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar variant="dense" style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit">
            Geek recette
          </Typography>
          <div style={{}}>{renderFilter()}</div>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "1rem" }}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={() => history.push("addRecipe")}
        >
          Ajouter une recette
        </Fab>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {recipeList.map((each, index) => renderCardView(each, index))}
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0.5rem",
    "&:hover": {
      cursor: "pointer",
    },
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
    //width: "auto",
    width: "100%",
    height: "50%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 150,
    height: "2.5rem",
  },

  fab: {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
  },
}));
