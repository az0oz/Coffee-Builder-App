import React, { useState, useEffect } from 'react'
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect, } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity }  from '../../shared/validation'

const Auth = props => {
    useEffect(() => {
        if (!props.buildingCoffee && props.authRedirectPath !== '/') {
            props.setAuthRedirectPath();
        }
      
    }, [props])
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password Of 8 Numbers'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 8,
                minLength: 8
            },
            valid: false,
            touched: false
        },
        
    })
    const [isSignUp, setIsSignUp] = useState(false)
    const inputChangedHandler = (event, inputId) => {
        const updatedAuthFrom = {
            ...controls,
            [inputId]: {
                ...controls[inputId],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[inputId].validation),
                touched: true
            }
        }

        setControls(updatedAuthFrom)
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp)

    }

    const formElementsArray = []
        for (const key in controls) {
           formElementsArray.push({
               id: key,
               config: controls[key]
           })
        }
    let form = formElementsArray.map(frmElm => {
            return (
                <Input 
                    key={frmElm.id}
                    elementType={frmElm.config.elementType}
                    elementConfig={frmElm.config.elementConfig}
                    value={frmElm.config.value}
                    invalid={!frmElm.config.valid}
                    shouldValidate={frmElm.config.validation}
                    touched={frmElm.config.touched}
                    changed={(event) => inputChangedHandler(event, frmElm.id)}
                />
            )
        })
    
    if (props.loading) {
        form = <Spinner />
    }

    let errMsg = null;

    if (props.error) {
        errMsg = (
            <h4 style={{color: 'red'}}>{props.error}</h4>
        )
    }

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div>
            {authRedirect}
            <form className={styles.Auth} onSubmit={(e) => submitHandler(e)}>
                {errMsg}
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchAuthModeHandler}>Switch To {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuth: state.auth.token !== null,
        buildingCoffee: state.coffeeBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, pass, isSignUp ) => dispatch(actions.auth(email, pass, isSignUp)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
