import React from 'react';
import axios from 'axios';
import Bar from './Bar';

export default class Homepage extends React.Component {

constructor(props) {
  super(props);
  this.state = { data: [] };
}

componentDidMount() {
  axios.get('https://api.myjson.com/bins/nr83z')
    .then(res => this.setState({ data: res.data.players
      .map((player => {
        let playerClone = JSON.parse(JSON.stringify(player));
        playerClone.votes = Math.floor(Math.random() * 1000);
        return playerClone;
      })) 
      .sort((player1, player2) => player2.votes - player1.votes)
    }));
}
    
  render() {
    if (this.state.data.length) {
      const maxSize = this.state.data
        .map(player => player.votes)
        .reduce((a, b) => Math.max(a, b));
      return ( 
        <div className='homepage'>
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
          <div id='title'>BUNNY GLOBAL</div>
          <div className='event_title'>BOSS MONSTER SUMMIT</div>
          <div class='vote'>VOTE NOW</div>
        </div>
      );
    } else {
      return "Loading...";
    }
  };
}