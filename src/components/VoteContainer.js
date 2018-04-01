import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';
import { Days, Hours, Minutes, Seconds } from 'react-countdowntimer';

import Panel from './Panel';

const url = 'https://api.myjson.com/bins/1btai7';

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
      if (this.state.selected.length === 3) {
        return;
      }
      const selectedClone = this.state.selected.concat([id]);
      this.setState({ selected: selectedClone });
    }
  }

  handleSubmit = () => {
    if (Cookies.get('bgvote') === 'success') {
      return;
    }
    const selections = this.state.data.map((player) => {
      let playerClone = JSON.parse(JSON.stringify(player));
      if (this.state.selected.includes(player.name)) {
        playerClone.votes++;
      }
      return playerClone;
    })
    axios.put(url, { players: selections })
    .then(() => {
      Cookies.set('bgvote', 'success', { expires: new Date('April 2, 2018')});
      this.setState({ status: 'success' });
      window.location.reload();
    })
    .catch(() => this.setState({ status: 'error' }));
  }

  nameColor = (votes) => {
    let voteCounts = Array.from(new Set(this.state.data.map(player => player.votes)))
      .sort((a,b) => b.votes - a.votes);
    if ([voteCounts[0], voteCounts[1]].includes(votes)) {
      return 'tag green';
    }  else if (voteCounts[voteCounts.length-1] === votes) {
      return 'tag red';
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
    return (
      <div className='container'>
        <h2>SUMMIT VOTING</h2>
        <div className='time-container'>
          <div>You are allowed 3 votes.<p></p></div>
          <div className='deadline'>Round 1 ends on <b>April 2</b>. Top 2 are locked in and bottom 1 is eliminated.</div>
          <div className='deadline'>Round 2 ends on <b>April 4</b>. Top 2 are locked in and bottom 2 are eliminated.</div>
          <div className='deadline'>Round 3 ends on <b>April 6</b>. Top 2 are locked in and bottom 2 are eliminated.</div>
          <div className='clock'>
            <span className="time"><Days deadline="April 2, 2018"/> days, </span>
            <span className="time"><Hours deadline="April 2, 2018"/>:</span>
            <span className="time"><Minutes deadline="April 2, 2018"/>:</span>
            <span className="time"><Seconds deadline="April 2, 2018"/> remaining in Round 1.</span>
          </div>
        </div>
        <div className='vote-container'>
          { this.state.data.map((player,id) => <Panel 
            {...player} 
            tagColor={this.nameColor(player.votes)}
            handleSelect={this.handleSelect} 
            id={id}
            selected={this.state.selected.includes(player.name)}/>)}
        </div>
        {Cookies.get('bgvote') === 'success' 
          ? ''
          : <div className='submit' onClick={this.handleSubmit}>SUBMIT</div>}
      </div>
    );
  }
}