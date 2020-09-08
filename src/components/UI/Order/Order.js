import React from 'react';

import Styles from './Order.module.css'

const order = (props) => {
    const ingredients = Object.entries(props.ingredients)
        .map(([key, value]) => {
            return (
                <span style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '5px 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                    }} 
                    key={key}> {key} ({value})
                </span>
            )
        })
    
    return ( 
        <div className={Styles.Order}>
            <h1>Order #{props.id}</h1>
            <h3>Ingredients: </h3>
            {ingredients}
            <h3>Total Price: <strong>{props.totalPrice.toFixed(2)} $</strong></h3>
        </div>
     );
}
 
export default order;