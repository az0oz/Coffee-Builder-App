import React, { Component, lazy, Suspense} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import CoffeeBuilder from './containers/CoffeeBuilder/CoffeeBuilder';
import Spinner from './components/UI/Spinner/Spinner';
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const PrivateRoute = lazy(() => import('./hoc/PrivateRoute/PrivateRoute'));

class App extends Component {
  state = {
    isAuth: false
  }

  constructor(props){
    super(props)
    this.props.tryAutoSignIn()
    setTimeout(() => {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.isAuth = this.props.isAuth;
    }, 2000);

  }
   
  render() {
    return (
      <div className="App">
        <Suspense fallback={<Spinner />}>
            <Layout>
              <Switch>
                <PrivateRoute isAuthenticated={this.state.isAuth} path="/checkout" component={Checkout}/>
                <PrivateRoute isAuthenticated={this.state.isAuth} path="/logout" component={Logout}/>
                <PrivateRoute isAuthenticated={this.state.isAuth} path="/orders" component={Orders}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/"  exact component={CoffeeBuilder}/>
              </Switch>
            </Layout>
          </Suspense>
      </div>
    )
  } 
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
