import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: ingName
    };
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const iniIngredients = () => {
    return dispatch => {
          axios.get(process.env.REACT_APP_BASE_URL + '/ingredients.json/')
            .then(response => {
                dispatch(setIngredients(response.data))
            }) 
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            }) 
    }
}

