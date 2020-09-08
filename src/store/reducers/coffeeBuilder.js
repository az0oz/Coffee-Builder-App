import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
    shot: 1.0, 
    water: 0.5,
    milk: 1.0,
    foam: 1.0,
    chocolate: 1.0,
    iced: 0.5
}

const initialState = {
    ingredients: null,
    totalPrice: 0,
    type: 'hot',
    error: false,
    building: false
}

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let type = state.type;
    if ( action.ingredientName === 'iced') {
        type = 'iced';
    }
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        type: type,
        building: true,
    }
    return updateObject(state, updatedState)
}

const removeIngredient = ( state, action ) => {
    const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const removeIngredients = updateObject(state.ingredients, removeIngredient);
    let type = state.type;
    if ( action.ingredientName === 'iced') {
        type = 'hot';
    }
    const updatedSt = {
        ingredients: removeIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        type: type,
        building: true
    }
    return updateObject(state, updatedSt)

}

const setIngredients = ( state, action ) => {
    return updateObject( state, {
        ingredients: action.ingredients,
        totalPrice: 0,
        error: false,
        type: 'hot',
        building: false
    }
  )
}

const fetchIngredientsFailed = ( state, action ) => {
    return updateObject( state, { 
        error: true 
        }
    )
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient( state, action )
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient( state, action )
        case actionTypes.SET_INGREDIENTS:
            return setIngredients( state, action )
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed( state, action )
        default:
            return state;
    }
}

export default reducer;