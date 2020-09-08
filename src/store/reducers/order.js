import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = ( state ) => {
    return updateObject( state, { loading: false } )
}

const purchaseCoffeeStart = ( state ) => {
    return updateObject( state, { loading: true } )
}

const purchaseCoffeeSuccess = ( state, action ) => {
    const newOrder = {
        id: action.orderId,
        ...action.orderData
    }
    return updateObject( state, {
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder),
        }
    )
}
const purchaseCoffeeFail = ( state, action ) => {
    return updateObject( state, { loading: false } )
}

const fetchOrderStart = ( state, action ) => {
    return updateObject( state, { loading: true } )
}

const fetchOrderSuccess = ( state, action ) => {
    return updateObject( 
        state,
            {
                orders: action.orders,
                loading: false
            }
        )
}

const fetchOrderFail = ( state, action ) => {
        return updateObject( state, { loading: true } )
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit( state, action )
        case actionTypes.PURCHASE_COFFEE_START:
            return purchaseCoffeeStart( state, action )
        case actionTypes.PURCHASE_COFFEE_SUCCESS:
            return purchaseCoffeeSuccess( state, action )
        case actionTypes.PURCHASE_COFFEE_FAIL:
            return purchaseCoffeeFail( state, action )
        case actionTypes.FETCH_ORDER_START:
            return fetchOrderStart( state, action )
        case actionTypes.FETCH_ORDER_SUCCESS:
            return fetchOrderSuccess( state, action )
        case actionTypes.FETCH_ORDER_FAIL:
            return fetchOrderFail( state, action )
        default:
             return state
    }
}

export default reducer;