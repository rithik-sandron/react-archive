import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Anime.css'
import { decrypt } from '../AES/aesUtils'

class Anime extends Component {

    constructor() {
        super()
        this.decrypt = decrypt.bind(this);
    }

    state = {
        list: []
    }

    componentDidMount() {
        axios.post('/listOfAnimes').then(
            res => {
                const list = JSON.parse(atob(this.decrypt('1234567890', res.data)));
                this.setState({ list: list });
                console.log(list)
            }
        );
    }

    render() {
        return (
            <div className="anime">
                <h1>Anime</h1>
                {/* {this.state.list.map(anime =>
                    <Link key={anime.toString()}
                        to={{
                            pathname: (this.props.match.url + "/" + anime).replaceAll(' ', '_'),
                            state: {anime, x: 'Anime is hand-drawn and computer animation originating from Japan. Anime, a term derived from the English word animation, is used in Japanese to describe all animation, regardless of style or origin.'}
                        }}>
                        <span>{anime}<br /></span>
                    </Link>)} */}
            </div>
        );
    }

}

export default Anime;
