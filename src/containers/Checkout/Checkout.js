import React, { Component } from 'react'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';

class Checkout extends Component {
   
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }
    
    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutContinue={this.checkoutContinueHandler}
                        checkoutCancel={this.checkoutCancelHandler}
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.coffeeBuilder.ingredients,
        purchased: state.order.purchased
    }
}





export default connect(mapStateToProps)(Checkout)
