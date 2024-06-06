import React, { Component } from 'react';
import './Hello.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom'

class Hello extends Component {

    state = {
        msg: ''
    }

    componentDidMount() {
        axios.get('/hello').then(response => {
            this.setState({ msg: response.data });
        });
    }

    render() {
        return (
            <div className="hello">
                <NavLink to="/"><h1>{this.state.msg}</h1></NavLink>
                <nav className="seperator">
                    <ul>
                        <li><NavLink to="/Aes">AES</NavLink></li>
                        <li><NavLink to="/Anime">Anime</NavLink></li>
                        <li><NavLink to="/Subscribe">Subscribe</NavLink></li>
                        <li><NavLink to="/TextEditor">TextEditor</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }

}

export default Hello;