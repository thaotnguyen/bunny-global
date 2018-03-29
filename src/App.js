import React, { Component } from 'react';
import logo from './logo.svg';
import Homepage from './components/Homepage';
import './App.css';
import './index.css';

// https://api.myjson.com/bins/nr83z

class App extends Component {
  render() {
    return (
      <div className="App">
        <Homepage />
      </div>
    );
  }
}

export default App;
