import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    // conditionally attach css classes for backdrop animation
    const isSideDrawerAttached = props.open ? styles.Open : styles.Close;
    return ( 
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/> 
                <div className={[styles.SideDrawer, isSideDrawerAttached].join(' ')}>
                    <div className={styles.Logo}>
                        <Logo />
                    </div>
                    <nav className={styles.DesktopOnly}>
                        <NavigationItems clicked={props.closed} isAuth={props.isAuth}/>
                    </nav>
                </div>
        </React.Fragment>
     );
}
 
export default sideDrawer;