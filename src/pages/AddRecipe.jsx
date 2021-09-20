import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { history } from "../index";

const AddRecipe = (props) => {
  const classes = useStyles();

  const [ingradiantsList, setIngradiantsList] = useState([
    { unit: "", value: "", id: 1 },
  ]);
  const [stepsList, setStepsList] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficultLevel, setDifficultLevel] = useState("");
  const [noOfPersons, setNoofPersons] = useState("");
  const [duration, setDuration] = useState("");

  // console.log(stepsList.length);

  const addIngradiant = () => {
    const ingradiantId = ingradiantsList.length;
    let ingradiantsListCopy = [...ingradiantsList];
    const newIngradiantInfo = { unit: "", value: "", id: ingradiantId + 1 };
    ingradiantsListCopy.push(newIngradiantInfo);
    setIngradiantsList(ingradiantsListCopy);
  };

  const deleteIngradiant = (ingradiantInfo) => {
    let ingradiantsListCopy = [...ingradiantsList];
    if (ingradiantsListCopy.length === 1) {
      return;
    }
    const indexToRemove = ingradiantsListCopy.findIndex(
      (x) => x.id === ingradiantInfo.id
    );
    ingradiantsListCopy.splice(indexToRemove, 1);
    setIngradiantsList(ingradiantsListCopy);
  };

  const addStep = () => {
    let stepsListCopy = [...stepsList];
    const newStepInfo = "";
    stepsListCopy.push(newStepInfo);
    setStepsList(stepsListCopy);
  };

  const deleteStep = (index) => {
    let stepsListCopy = [...stepsList];
    if (stepsListCopy.length === 1) {
      return;
    }

    stepsListCopy.splice(index, 1);
    setStepsList(stepsListCopy);
  };

  const onIngradiantUnitValueChange = (info, value) => {
    let ingradiantsListCopy = [...ingradiantsList];
    const indexToChange = ingradiantsListCopy.findIndex(
      (x) => x.id === info.id
    );
    ingradiantsListCopy[indexToChange].unit = value;
    setIngradiantsList(ingradiantsListCopy);
  };

  const onIngradiantInfoChange = (info, value) => {
    let ingradiantsListCopy = [...ingradiantsList];
    const indexToChange = ingradiantsListCopy.findIndex(
      (x) => x.id === info.id
    );
    ingradiantsListCopy[indexToChange].value = value;
    setIngradiantsList(ingradiantsListCopy);
  };

  const onStepInfoChange = (index, value) => {
    const stepsListCopy = [...stepsList];
    stepsListCopy[index] = value;
    setStepsList(stepsListCopy);
  };

  const ingradiantListInfo = (x, i) => {
    return (
      <div style={{ width: "100%" }} key={i.toString()}>
        <TextField
          error={false}
          id="stepsValueId"
          label="Quantité"
          defaultValue=""
          value={x.unit}
          helperText=""
          variant="outlined"
          style={{ width: "10%" }}
          onChange={(event) =>
            onIngradiantUnitValueChange(x, event.target.value)
          }
        />
        <FormControl
          variant="outlined"
          style={{ width: "10%", marginTop: "0.5rem" }}
          error={false}
        >
          <InputLabel id="stepsUnitLabel">Unité</InputLabel>
          <Select
            labelId="stepsUnitLabel"
            id="stepsUnitSelect"
            //   value={age}
            //   onChange={handleChange}
            label="Unité"
          >
            <MenuItem value="">
            </MenuItem>
            <MenuItem value={"cl"}>cl</MenuItem>
            <MenuItem value={"mg"}>mg</MenuItem>
            <MenuItem value={"lt"}>litre</MenuItem>
          </Select>
        </FormControl>
        <TextField
          style={{ width: "57%" }}
          error={false}
          id="outlined-error-helper-text"
          label="Ingrediants détaillé"
          defaultValue=""
          helperText=""
          value={x.value}
          variant="outlined"
          onChange={(event) => onIngradiantInfoChange(x, event.target.value)}
        />
        <DeleteIcon
          color="error"
          style={{ marginTop: "1.5rem" }}
          onClick={() => deleteIngradiant(x)}
        />
      </div>
    );
  };

  const onAddRecipe = () => {
    // console.log(ingradiantsList);
    // console.log(stepsList);
    // console.log(title);
    // console.log(description);
    // console.log(difficultLevel);
    // console.log(noOfPersons);
    // console.log(duration);
    const url = "http://localhost:9000/api/recipes";
    ingradiantsList.forEach((v) => {
      delete v.id;
    });
    const params = {
      titre: title,
      description: description,
      niveau: difficultLevel,
      personnes: Number(noOfPersons),
      tempsPreparation: Number(duration),
      ingredients: ingradiantsList.map((obj) => Object.values(obj)),
      etapes: stepsList,
    };
    console.log("request --- ", params);
    axios
      .post(url, params)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderSteps = (stepInfo, index) => {
    return (
      <>
        <TextareaAutosize
          style={{ height: "3rem", width: "77%", marginRight: "0.5rem" }}
          maxRows={6}
          aria-label="maximum height"
          placeholder={"étape " + (index + 1)}
          defaultValue=""
          onChange={(event) => onStepInfoChange(index, event.target.value)}
        />
        <DeleteIcon
          color="error"
          style={{ marginTop: "1.5rem" }}
          onClick={() => deleteStep(index)}
        />
      </>
    );
  };

  return (
    <div>
      Ajouter une recette
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Titre"
            defaultValue=""
            helperText=""
            value={title}
            variant="outlined"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Description"
            defaultValue=""
            helperText=""
            value={description}
            variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            error={false}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Niveau
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={difficultLevel}
              onChange={(event) => setDifficultLevel(event.target.value)}
              label="Niveau"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"padawan"}>padawan</MenuItem>
              <MenuItem value={"jedi"}>jedi</MenuItem>
              <MenuItem value={"maitre"}>maitre</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Personnes"
            defaultValue=""
            helperText=""
            variant="outlined"
            type="number"
            onChange={(event) => setNoofPersons(event.target.value)}
          />
        </div>
        <div>
          <TextField
            error={false}
            id="outlined-error-helper-text"
            label="Temps de Preparation"
            defaultValue=""
            helperText=""
            variant="outlined"
            type="number"
            onChange={(event) => setDuration(event.target.value)}
          />
        </div>
        <div>{ingradiantsList.map((x, i) => ingradiantListInfo(x, i))}</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: "9rem",
          }}
        >
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            size="small"
            className={classes.margin}
            onClick={() => addIngradiant()}
          >
            <AddIcon />
            Ajouter un ingredients
          </Fab>
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            // marginLeft: "9rem",
          }}
        >
          {stepsList.map((x, i) => renderSteps(x, i))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: "9rem",
          }}
        >
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            size="small"
            className={classes.margin}
            onClick={() => addStep()}
          >
            <AddIcon />
             Ajouter une étape
          </Fab>
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "1rem" }}
            onClick={() => onAddRecipe()}
          >
            Ajouter une recette
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => history.goBack()}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "80%",
  },
}));
