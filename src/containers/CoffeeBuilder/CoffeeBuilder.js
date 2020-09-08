import React, { Component } from 'react'
import { connect } from 'react-redux'

import Coffee from '../../components/Coffee/Coffee';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Coffee/OrderSummary/OrderSummary';
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import Controls from '../../components/Coffee/Controls/Controls';

export class CoffeeBuilder extends Component {
    state = { 
        purchaseable: false,
        purchasing: false,
     }

     componentDidMount = () => {
         this.props.initIngredientsHandler();
     }

    updatePurchaseState = (ingredientsUpdated) => {
        const sum = Object.keys(ingredientsUpdated)
            .map(ingKey => {
                return ingredientsUpdated[ingKey]
            })
            .reduce((sum, elem) => {
                return sum + elem;
            }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({
                purchasing: true
            })
        }
        else {
            this.props.setAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
       
    }
    
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {     
        this.props.initPurchase();   
        this.props.history.push({
            pathname: '/checkout',
        })
    }

    sumOfIngredients = (disabledInfo) => {

        let sumOfIngredients = 0;

        for (const key in disabledInfo) {
            if (key !== 'iced'){
                sumOfIngredients += disabledInfo[key];
            }
        }

        return sumOfIngredients
    }
        
    render() {
        const disabledRemoveIngredients = {  
            ...this.props.ingredients
        }

        const disabledAddIngredients = {  
            ...this.props.ingredients
        }

        const totalIngredients = this.sumOfIngredients(disabledAddIngredients)

        for (let key in disabledRemoveIngredients){
            totalIngredients === 4 ? disabledAddIngredients[key] = true : disabledAddIngredients[key] = false
            disabledRemoveIngredients[key] = disabledRemoveIngredients[key] <= 0;
        }

        let orderSummary = null;
        let coffee = this.props.error ? <h2>Ingredients cannot be loaded :(</h2> : <Spinner />;

        if (this.props.ingredients) {
            coffee = (
                <React.Fragment>
                    <Coffee ingredients={this.props.ingredients}/>
                    <Controls 
                        coffeeType={this.props.coffeeType}
                        isAuth={this.props.isAuth}
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        totalPrice={this.props.totalPrice}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        purchasing={this.purchaseHandler}
                        disabledAdd={disabledAddIngredients}
                        disabledRemove={disabledRemoveIngredients} 
                    />
                </React.Fragment>
                );
            orderSummary =  <OrderSummary 
                                cancelled={this.purchaseCancelHandler}
                                continued={this.purchaseContinueHandler}
                                totalPrice={this.props.totalPrice}
                                ingredients={this.props.ingredients}
                            />
        }
        
         return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {coffee}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.coffeeBuilder.ingredients,
        coffeeType: state.coffeeBuilder.type,
        totalPrice: state.coffeeBuilder.totalPrice,
        error: state.coffeeBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initPurchase : () => dispatch(actions.purchaseInit()),
        addIngredientHandler: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredientsHandler: () => dispatch(actions.iniIngredients()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( CoffeeBuilder, axios ));