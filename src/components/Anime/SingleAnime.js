import React from 'react'
import './Anime.css'

function SingleAnime(props) {
    const anime = props.location.state;
    return (
        anime ?
            (<div className="anime" >
                <h1>{anime.anime}</h1>
                <span>{anime.x}</span>
            </div>) : null
    );  
}

export default SingleAnime;