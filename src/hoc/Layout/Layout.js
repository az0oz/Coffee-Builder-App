import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        triggerSideNavigation: true
    }
    sideDrawerOpenHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
     render () {
        return (
            <React.Fragment>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    open={this.sideDrawerOpenHandler}
                />
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);