import React from 'react';
import styles from './SideDrawerToggler.module.css'
import sideDrawerTogglerIcon from '../../../assets/images/Hamburger_icon.svg.png'

const sideDrawerToggler = (props) => {
    return ( 
        <div className={[styles.SideDrawerToggler, styles.MobileOnly].join(' ')}> 
            <button onClick={props.clicked}>
                <img src={sideDrawerTogglerIcon} alt="sideDrawerTogglerIcon"/>
            </button>
        </div>
     );
}
 
export default sideDrawerToggler;