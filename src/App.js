import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Hello from './components/1/Hello'
import './components/1/Hello.css';
import Router from './components/Router/Router';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Hello />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
