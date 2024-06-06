import React, { Component } from 'react';

import '../Form/Form.css'
import Form from '../Form/Form'
import axios from 'axios';
import { encrypt } from '../AES/aesUtils'

class Subscribe extends Component {

    constructor() {
        super()
        this.encrypt = encrypt.bind(this);
    }

    state = {
        form: {
            Email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email',
                    validations: {
                        required: true
                    }
                },
                value: '',
                valid: false

            },

            //  DropDown: {
            //     type: 'select',
            //     config: {
            //         options:[
            //             { value: 'All updates'},
            //             { value: 'Only product related updates'}
            //         ]
            //     },
            //     value:''
            // }
        }
    }

    inputChangeHandler = (event, id) => {
        const form = this.state.form;
        //console.log(form);
        const data = this.state.form[id];
        data.value = event.target.value;
        form[id] = data;
        this.setState({ form: form });
        //console.log(this.state.form);
    }

    checkValidity(value, validations) {
        let validationArray = [];
        for (let key in validations) {
            validationArray.push({
                key: key,
                validation: validations[key]
            });
        }
        if (validationArray[0].validation) {
            return value.trim() !== '';
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.form;
        axios.post('/subscribe', this.encrypt(JSON.stringify(data), '1234567890')).then(
            res => {
                const resData = JSON.parse(res.data);
                if (!this.checkValidity(resData.Email.value, resData.Email.config.validations)) {
                    alert('email filed is required');
                }
                const form = this.state.form;
                const data = this.state.form['Email'];
                data.value = resData.Email.value;
                form['Email'] = data;
                this.setState({ form: form });
                console.log(this.state.form)
            }
        );

    }

    render() {
        let formArray = [];

        for (let key in this.state.form) {
            formArray.push({
                label: key,
                config: this.state.form[key]
            });
        }

        return (
            <div className="container">
                <h1>Subscribe</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    {formArray.map(x => <Form key={x.label}
                        label={x.label} type={x.config.type}
                        config={x.config.config} value={x.value} changed={(event) => this.inputChangeHandler(event, x.label)} />)}
                    <button type="submit" className="button">Subscribe</button>
                </form>
            </div>
        );
    }

}

export default Subscribe;