import React from 'react'
import styles from './Coffee.module.css';
import CoffeeIngredient from './CoffeeIngredient/CoffeeIngredient';

const coffee = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <CoffeeIngredient key={ingKey + i} type={ingKey}/>
            });
        })
        .reduce((arr, elem) => {
            return arr.concat(elem);
        }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p style={{textTransform: 'uppercase', marginLeft:'10px', marginBottom: '100px'}}>Please start adding ingredients</p>
    }
    return (
            <div className={styles.Coffee}>
                <div className={styles.Handle}></div>
                <div className={styles.Cup}>
                    <div className={styles.Content}>
                        {transformedIngredients}
                    </div>
                </div>
            </div>
        );
}

export default coffee;