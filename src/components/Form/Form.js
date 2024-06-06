import React from 'react';
import './Form.css'
import '../1/Hello.css'

function form(props) {

    let element;

    switch (props.type) {
        case 'input':
            element = <input {...props.config} value={props.value} onChange= {props.changed}/>
            break;

        case 'textarea':
            element = <textarea {...props.config} value={props.value} onChange= {props.changed}/>
            break;

        case 'select':
            element = 
            (<select
                value={props.value} onChange= {props.changed}>
                {props.config.options.map(x => {
                    return <option value={x.value}>{x.value}</option>
                })}
            </select>);
            break;
        default:
            element = null;


    }
    return (
        <div>
            <span><label>{props.label}</label></span><br />
            {element}<br />
        </div>
    );

}

export default form;