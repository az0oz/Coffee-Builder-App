import React from 'react';
import Styles from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'

const navigationItem = ( props ) => {
    return (  
        <li className={Styles.NavigationItem} onClick={props.clicked}>
            <NavLink
               to={props.link}
               exact
               activeClassName={Styles.active}>
               {props.children}
            </NavLink>
        </li>
    );
}
 
export default navigationItem;
