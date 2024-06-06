import axios from 'axios';
import React, { Component } from 'react';
import { encrypt, decrypt } from '../AES/aesUtils'


import './Aes.css';
class Aes extends Component {
    constructor() {
        super();
        this.encrypt = encrypt.bind(this);
        this.decrypt = decrypt.bind(this);
    }
    state = {
        Fencrypt: 'Hi, how are you?',
        Bdecrypt: '',
        key: '1234567890',
        F2encrypt: '[backend: encrypted] Hello',
        B2decrypt: '',
    }

    componentDidMount() {

        axios.post('/decryption', this.encrypt(JSON.stringify(this.state.Fencrypt), this.state.key)).then(
            res => {
                this.setState({ Bdecrypt: res.data });
            }
        );

        axios.post('/encryption').then(
            res => {
                this.setState({ B2decrypt: atob(this.decrypt('1234567890', res.data)) });
            }
        );
    }

    render() {
        return (
            <div className="aes">
                <div>
                    <h2><i className="much-heart"></i>
                    This is an AES Encryption with KDF key derivation through SHA512, HMAC, Base64 and Hex
                    </h2>
                </div>

                <div className="imessage">
                    <p className="from-them">{this.state.Fencrypt}</p>
                    <p className="from-me">{this.state.Bdecrypt}</p>
                    <p className="from-them">{this.state.F2encrypt}</p>
                    <p className="from-me">{this.state.B2decrypt}</p>
                </div>
            </div>
        );

    }

}

export default Aes;