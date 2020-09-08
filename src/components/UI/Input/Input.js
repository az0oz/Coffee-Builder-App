import React from 'react';
import Styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [Styles.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(Styles.Invalid)
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value}/>;
            break;
        case ( 'select' ):
            inputElement = <select 
                                 onChange={props.changed} className={[...inputClasses, Styles.SelectElement].join(' ')}  
                                {...props.elementConfig} 
                                value={props.value}
                            >;
                                {props.elementConfig.options.map( option => {
                                    return <option key={option.value} value={option.value}>{option.displayValue}</option>
                                })}
                            </select>
            break;
        default: 
            inputElement = <input  onChange={props.changed} className={Styles.InputElement}  {...props.elementConfig} value={props.value}/>;
    }
    return ( 
        <div className={Styles.Input}>
            <label className={Styles.Label}>{props.label}</label>
            {inputElement}
        </div>
     );
}
 
export default input;