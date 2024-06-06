import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Aes from '../AES/Aes'
import Anime from '../Anime/Anime'

import SingleAnime from '../Anime/SingleAnime'
import Subscribe from '../Subscribe/Subscribe'
import TextEditor from '../TextEditor/TextEditor'

function Router() {
    return (
        <div>
            <Switch>
                {/* <Route path="/" exact component={Hello} /> */}
                <Route path="/" exact component={Aes} />
                <Route path="/Aes" exact component={Aes} />
                <Route path="/Subscribe" exact component={Subscribe} />
                <Route path="/TextEditor" exact component={TextEditor} />
                <Route path="/Anime" exact component={Anime} />
                <Route path="/Anime/:name" exact component={SingleAnime} />
                
                <Route render={() => <h1 className="container">404 Page not found</h1>} />
            </Switch>
        </div>
    );
}
export default Router;