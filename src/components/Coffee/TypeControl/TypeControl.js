import React from 'react'
import styles from './TypeControl.module.css';


const typeControl = (props) => {
    return ( 
        <div className={styles.TypeControl}>
            <div className={styles.Label}>
                {props.label}
            </div>
            <button className={styles.Less} onClick={props.ingredientRem} disabled={props.coffeeType === 'hot' ? true : false}>Hot</button>
            <button className={styles.More} onClick={props.ingredientAdd} disabled={props.coffeeType === 'iced' ? true : false}>Iced</button>
        </div>
     );
}
 
export default typeControl;