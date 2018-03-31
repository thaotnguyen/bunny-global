import React from 'react';
import axios from 'axios';

export default class Homepage extends React.Component {

handleVoteClick = () => {
  document.getElementsByClassName('vote-container')[0].scrollIntoView({ behavior: 'smooth' });
}
    
  render() {
     return ( 
      <div className='homepage'>
        <div className='sticky'>
          <div id='stars'></div>
          <div id='stars2'></div>
          <div id='stars3'></div>
          <div id='title'>BUNNY GLOBAL</div>
          <div className='event_title'>BOSS MONSTER SUMMIT</div>
          <div className='vote' onClick={this.handleVoteClick}>VOTE<div className='chevron'>〉</div></div>
        </div>
      </div>
    );
  };
}