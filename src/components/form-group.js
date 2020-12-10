import React from 'react';

const FormGroup = (props) => {
    return (
        <div class="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup;