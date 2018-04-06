import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import Panel from './Panel';

const url = 'https://api.myjson.com/bins/up7kj';
const cookie = 'bgvote_r4';
const deadline = 'April 6, 2018';

const countOccurrences = (arr, num) => {
  return arr.map(i => i === num).reduce((a,b) => a + b, 0);
}

export default class VoteContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: [], 
      status: '',
      error_message: '' };
  }

  handleSelect = (id) => {
    if (this.state.selected.includes(id)) {
      const selectedClone = this.state.selected.filter(i => i !== id);
      this.setState({ selected: selectedClone });
    } else {
      if (this.state.selected.length === 1) {
        return;
      }
      const selectedClone = this.state.selected.concat([id]);
      this.setState({ selected: selectedClone });
    }
  }

  handleSubmit = () => {
    if (Cookies.get(cookie) === 'success') {
      return;
    }
    axios.get(url)
    .then(res => {
      const selections = res.data.players.map((player) => {
        let playerClone = JSON.parse(JSON.stringify(player));
        if (this.state.selected.includes(player.name)) {
          playerClone.votes++;
        }
        return playerClone;
      })
      axios.put(url, { players: selections })
        .then(() => {
        Cookies.set(cookie, 'success', { expires: new Date(deadline)});
        this.setState({ status: 'success' });
        window.location.reload();
      })
      .catch(() => this.setState({ status: 'error' }));
    });
    
    
  }

  nameColor = (votes) => {
    if (!votes) {
      return 'tag';
    }
    let filteredPlayers = this.state.data.filter((player) => player.status === 'pending');
    let voteCounts = Array.from(new Set(filteredPlayers.map(player => player.votes)))
      .sort((a,b) => b - a);
    let winningCounts;
    let losingCounts;
    if (countOccurrences(filteredPlayers.map(player => player.votes), voteCounts[0]) === 1) {
      winningCounts = [voteCounts[0], voteCounts[1]];
    } else {
      winningCounts = [voteCounts[0]];
    }
    if (countOccurrences(filteredPlayers.map(player => player.votes), voteCounts[voteCounts.length-1]) === 1) {
      losingCounts = [voteCounts[voteCounts.length-1], voteCounts[voteCounts.length-2]];
    } else {
      losingCounts = [voteCounts[voteCounts.length-1]];
    }
    if (losingCounts.includes(votes)) {
      return 'tag red';
    } else if (winningCounts.includes(votes)) {
      return 'tag green';
    } else {
      return 'tag';
    }
  }

  componentDidMount() {
    axios.get(url)
    .then(res => this.setState({ data: res.data.players
      .sort((player1, player2) => player2.votes - player1.votes)
    }));
  }

  render() {
    let days = 0;
    let hours = 0;
    let countDownDate = new Date(deadline).getTime();
    let x = setInterval(function() {
      let now = new Date().getTime();
      let distance = countDownDate - now;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (countDownDate > now) {
        document.getElementsByClassName("time")[0].innerHTML = 
        `${days !== 0 ? days + 'd' : ''} ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} remaining.`;
      } else {
        document.getElementsByClassName("time")[0].innerHTML = 
        `Voting is over.`;
      } 
    }, 1000);
    return (
      <div className='container'>
        <h2>SUMMIT VOTING</h2>
        <div className='time-container'>
          <div className='clock'>
            <span className='time'></span>
          </div>
        </div>
        <div className='confirmed'>  
          <h2>CONFIRMED</h2>  
          <div className='vote-container'>
            { this.state.data.filter((player) => player.status === 'in').map((player,id) => <Panel 
              {...player} 
              tagColor={this.nameColor()}
              handleSelect={this.handleSelect} 
              id={id}
              key={id}
              selected={this.state.selected.includes(player.name)}/>)}
          </div>
        </div>
        <div className='eliminated'>  
          <h2>ELIMINATED</h2>  
          <div className='vote-container'>
            { this.state.data.filter((player) => player.status === 'out').map((player,id) => <Panel 
              {...player} 
              tagColor={this.nameColor()}
              handleSelect={this.handleSelect} 
              id={id}
              selected={this.state.selected.includes(player.name)}/>)}
          </div>
        </div>
      </div>
    );
  }
}