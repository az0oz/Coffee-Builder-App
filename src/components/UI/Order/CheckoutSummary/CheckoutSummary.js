import React from 'react';

import Coffee from '../../../Coffee/Coffee';
import Button from '../../Button/Button';
import styles from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope you like our Coffee :)</h1>
            <div style={{
                width: '100%',
                margin: 'auto'
            }}>
            <Coffee ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}
                >
                    Continue
            </Button>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancel}
                >
                    Cancel
            </Button>
        </div>
      );
}
 
export default checkoutSummary;