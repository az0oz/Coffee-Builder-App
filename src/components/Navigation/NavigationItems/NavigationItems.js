import React from 'react';
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (  
        <ul className={styles.NavigationItems}>
            <NavigationItem clicked={props.clicked} link='/'>Coffee Builder</NavigationItem>
            {/* <NavigationItem link='/orders' >Orders</NavigationItem> */}
            { props.isAuth 
                ? 
                (
                    <React.Fragment>
                        <NavigationItem clicked={props.clicked} link='/orders' >Orders</NavigationItem>
                        <NavigationItem clicked={props.clicked} link='/logout' >Logout</NavigationItem>
                    </React.Fragment>
                )
                : 
                (
                    <NavigationItem clicked={props.clicked} link='/auth' >Authenticate</NavigationItem>
                )
            }
        </ul>
    );
}

 
export default navigationItems;