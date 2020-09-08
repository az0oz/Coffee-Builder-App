import React from 'react';

import coffeeLogo from '../../../assets/images/coffee-logo.png' 
import styles from './Logo.module.css'

const logo = (props) => {
    return ( 
        <div className={styles.Logo}>
            <img src={coffeeLogo} alt="TheCoffeeLogo"></img>
        </div>
     );
}
 
export default logo;