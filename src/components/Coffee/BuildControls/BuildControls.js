import React from 'react'
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Water', type: 'water'},
    { label: 'Shot', type: 'shot'},
    { label: 'Milk', type: 'milk'},
    { label: 'Foam', type: 'foam'},
    { label: 'Chocolate', type: 'chocolate'}
];

const buildControls =  (props) => { console.log(props); return(
    <div className={styles.BuildControls}>
        {
            controls.map((control) => {
                return <BuildControl 
                            key={control.label} 
                            label={control.label}
                            added={()=> props.ingredientAdd(control.type)}
                            removed={()=> props.ingredientRem(control.type)}
                            disabledAdd={props.disabledAdd[control.type]}
                            disabledRemove={props.disabledRemove[control.type]}
                        />
            })
        }
      
    </div>
)};
 
export default buildControls;