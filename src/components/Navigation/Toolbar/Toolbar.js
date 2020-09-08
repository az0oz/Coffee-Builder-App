import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggler from '../SideDrawerToggler/SideDrawerToggler';

const toolbar = (props) => {
    return ( 
        <header className={styles.Toolbar}>
            <SideDrawerToggler clicked={props.open}/>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
               <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
     );
}
 
export default toolbar;