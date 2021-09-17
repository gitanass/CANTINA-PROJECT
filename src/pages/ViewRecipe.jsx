import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ViewRecipe = () => {
    const classes = useStyles();
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() =>{
        getRecipeList()
    },[]);

    const getRecipeList = () => {
        axios.get("http://localhost:9000/api/recipes").then((resp) =>{
            console.log(resp.data);
            setRecipeList(resp.data)
        }).catch((error) => console.log(error))
    }

    const renderCardView = (recipe, index) =>{
        return  <Card className={classes.root} key={index.toString()} onClick={() =>{}}>
        <div className={classes.details}>
            <img
            className={classes.cover}
            src={recipe.photo}
            />
            <CardContent className={classes.content}>
                <div>
                    <Typography variant="subtitle1" color="textSecondary">
                    {recipe.titre}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                    {recipe.description}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                    <span>Difficulty Level : </span>
                    <span>{recipe.niveau}</span>
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                    <span>Number of People : </span>
                    <span>{recipe.personnes}</span>
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                    <span>Preparation time : </span>
                    <span>{recipe.tempsPreparation}</span>
                    </Typography>
                </div>
                <div className={classes.controls}>
                    <div className={classes.buttonRoot}>
                        <Button variant="contained" color="primary">
                            Modify
                        </Button>
                        <Button variant="contained" color="secondary">
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </div>
      </Card>
    }

    return <div style={{display:'inline-block'}}>
        {recipeList.map((each, index) => renderCardView(each, index))}
    </div>
}

export default ViewRecipe;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      margin:'0.5rem',
      '&:hover': {
        cursor: "pointer",
     }
    },
    buttonRoot: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    details: {
      display: 'flex',
      flexDirection: 'row',
    },
    content: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    cover: {
      //width: 'auto',
      width: 250,
      height:250
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }));