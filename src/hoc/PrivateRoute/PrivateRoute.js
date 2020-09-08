import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            exact
            render={props => {
                    if (rest.isAuth) {
                       return <Component {...props} />
                    }
                    else {
                        return <Redirect to="/auth"/>
                    }
                }
            }
        />
        
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        token: state.auth.token,
    } 
  } 
  
  
export default connect(mapStateToProps)(PrivateRoute);
  
