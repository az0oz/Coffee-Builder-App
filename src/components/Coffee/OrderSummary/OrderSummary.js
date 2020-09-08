import React, { Component } from 'react';
import styles from './OrderSummary.module.css'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.entries(this.props.ingredients)
        .map(([key, value]) => {
            return (
                <li key={key}>
                   <span>{key}:</span> {value}
                </li>
            )
        })
        return (  
            <React.Fragment>
                <div className={styles.OrderSummary}>
                    <h3>Your Order</h3>
                    <p>A delicious hot fresh coffee:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <h2>Your Total = {this.props.totalPrice.toFixed(2)} $</h2>
                    <p>Continue to Checkout?</p>
                    <Button btnType='Danger' clicked={this.props.cancelled}>Cancel</Button>
                    <Button btnType='Success' clicked={this.props.continued}>Continue</Button>
                </div>
            </React.Fragment>
        );
    }
}

 
export default OrderSummary;