import React from 'react'
import PropTypes from 'prop-types'
import styles from './CoffeeIngredient.module.css';

const coffeeIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case ('shot'):
            ingredient = <div className={styles.Shot}></div>
            break;
        case ('milk'):
            ingredient = <div className={styles.Milk}></div>
            break;
        case ('foam'):
            ingredient = <div className={styles.Foam}></div>
            break;
        case ('chocolate'):
            ingredient = <div className={styles.Chocolate}></div>
            break;
        case ('water'):
            ingredient = <div className={styles.Water}></div>
            break;
        case ('iced'):
            ingredient = 
                <React.Fragment>
                    <div className={[styles.Ice, styles.IceCube1].join(' ')}></div>
                    <div className={[styles.Ice, styles.IceCube2].join(' ')}></div>
                    <div className={[styles.Ice, styles.IceCube3].join(' ')}></div>
                    <div className={[styles.Ice, styles.IceCube4].join(' ')}></div>
                    <div className={[styles.Ice, styles.IceCube5].join(' ')}></div>
                </React.Fragment>
            break;
        default:
            ingredient = null;
    }

    return ingredient;
}

coffeeIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default coffeeIngredient;