import React, { Component } from 'react'
import axios from '../../../axios-order'
import { connect } from 'react-redux'
 
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Styles from './ContactData.module.css'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { checkValidity }  from '../../../shared/validation'

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name of at least 3 characters'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street of at least 5 characters'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false

                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code of 5 numbers'
                    },
                    value: '',
                    validation: {
                        isNumeric: true,
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        isEmail: true,
                        required: true,
                    },
                    valid: false,
                    touched: false

                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'fastest'},
                            {value: 'cheapest', displayValue: 'cheapest'}
                        ],
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                },
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElemId in this.state.orderForm) {
            formData[formElemId] = this.state.orderForm[formElemId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            coffeeType: this.props.coffeeType,
            userId: this.props.userId
        }

        this.props.orderCoffeeHandler(order, this.props.token)
        
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderFrom = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderFrom[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true; 
        updatedOrderFrom[inputId] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedOrderFrom) {
            formIsValid = updatedOrderFrom[inputId].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderFrom,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementsArray = []
        for (const key in this.state.orderForm) {
           formElementsArray.push({
               id: key,
               config: this.state.orderForm[key]
           })
        }
        let form =  ( <form onSubmit={this.orderHandler} className={Styles.ContactData}>
                        <h4>Enter You Contact Data</h4>
                        {formElementsArray.map( (elem, index) => {
                            return <Input 
                                        key={index}
                                        elementType={elem.config.elementType}
                                        elementConfig={elem.config.elementConfig}
                                        value={elem.config.value}
                                        invalid={!elem.config.valid}
                                        shouldValidate={elem.config.validation}
                                        touched={elem.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, elem.id)}
                                    />
                        })}
                        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
                    </form> );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div>
               {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.coffeeBuilder.ingredients,
        totalPrice: state.coffeeBuilder.totalPrice,
        coffeeType: state.coffeeBuilder.type,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderCoffeeHandler: (orderData, token) => dispatch(actions.purchaseCoffee(orderData, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))