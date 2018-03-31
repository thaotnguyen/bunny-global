import React, { Component } from 'react';
import logo from './logo.svg';
import Homepage from './components/Homepage';
import VoteContainer from './components/VoteContainer';
import './App.css';
import './index.css';

// https://api.myjson.com/bins/nr83z

class App extends Component {
  render() {
    return (
      <div className="App">
        <Homepage />
        <VoteContainer />
      </div>
    );
  }
}

export default App;
