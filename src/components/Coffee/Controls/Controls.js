import React from 'react'
import styles from './Controls.module.css'
import BuildControls from '../BuildControls/BuildControls'
import TypeControl from '../TypeControl/TypeControl'

const Controls = props => (
    <div className={styles.Controls}>
        <h4 style={{margin: '10px', color: 'red', textTransform: 'uppercase'}}>* You can add a maximum of four (4) items </h4>
        <h2 style={{margin: '15px', color: 'whitesmoke', textTransform: 'uppercase'}}>Current Price: {props.totalPrice.toFixed(2)}</h2>
        <TypeControl
            label="Type"
            coffeeType={props.coffeeType}
            ingredientAdd={() => props.ingredientAdded('iced')}
            ingredientRem={() => props.ingredientRemoved('iced')}
            totalPrice={props.totalPrice}
            purchaseable={props.purchaseable}
            purchasing={props.purchasing}
        />
        <BuildControls 
            isAuth={props.isAuth}
            ingredientAdd={props.ingredientAdded}
            ingredientRem={props.ingredientRemoved}
            totalPrice={props.totalPrice}
            purchaseable={props.purchaseable}
            purchasing={props.purchasing}
            disabledAdd={props.disabledAdd}
            disabledRemove={props.disabledRemove} 
        />
        <button 
            className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.purchasing}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>
    </div>
)



export default Controls
