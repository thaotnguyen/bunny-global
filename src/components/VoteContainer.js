import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'js-cookie';

import Panel from './Panel';

const url = 'https://api.myjson.com/bins/1431j3';

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
      Cookies.set('bgvote', 'success');
      this.setState({ status: 'success' })
    })
    .catch(() => this.setState({ status: 'error' }));
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
        <p>You are allowed 3 votes. Rounds end at midnight.</p>
        <div className='vote-container'>
          { this.state.data.map((player,id) => <Panel 
            {...player} 
            handleSelect={this.handleSelect} 
            id={id}
            selected={this.state.selected.includes(player.name)}/>)}
        </div>
        <div className='submit' onClick={this.handleSubmit}>SUBMIT</div>
      </div>
    );
  }
}