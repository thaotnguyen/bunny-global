import axios from 'axios';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import $ from 'jquery';
import Cookies from 'js-cookie';

import "react-table/react-table.css";

const url = 'https://api.myjson.com/bins/1cni07';

const calcScore = (team, data) => {
  const playerNames = team.map(a => a.tag);
  console.log(data.filter(a => playerNames.indexOf(a.tag) !== -1));
  return data
    .filter(a => playerNames.indexOf(a.tag) !== -1)
    .map(a => a.points)
    .reduce((a, b) => a + b);
}

const columns = (data) => [
  {
    Header: 'Owner',
    accessor: 'name',
    Cell: row => row.value.split(' ')[0],
  },
  {
    Header: 'Team',
    accessor: 'team',
    Cell: row => row.value.sort((a,b) => b.tag - a.tag).map(entry => <div>{entry.tag}</div>),
  },
  {
    Header: 'Score',
    accessor: 'score',
  }
];

export default class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: true, status: '', uid: '', accessToken: '', name: '', rosters: [], players: [] };
    $(window).scroll(function() {
      var scrolledY = $(window).scrollTop();
      $('.header-container').css('background-position', 'left ' + ((scrolledY)) + 'px');
    });
  }

  componentDidMount() {
    if (Cookies.get('bg-name')) {
      this.setState({ name: Cookies.get('bg-name') });
    } else {
      window.location.replace('/');
    }
    axios.get(url)
      .then(res => this.setState({
         rosters: res.data.rosters.map((roster) => {
           const score = calcScore(roster.team, res.data.players);
           return {score, ...roster}; 
         }), 
         players: res.data.players,
      }));
  }

  render() {
    return (
      <div className='roster'>
        <div className='container'>   
          <div className='header-container'>
            <Fade right duration={500} distance='50px'>
              <h1>Rosters</h1>
            </Fade>  
          </div>
          <Fade right duration={500} distance='50px'>
            <p>Last year our big event was the Civil War between NickC and Owsla. No one knows which side actually won or what the score was between the two. This year we're ending things off with our head TO's passing... his classes at NYU and graduating. That's right! Paul D is leaving us and we are all gathering to mourn this loss. But we're also celebrating because he doesn't seem so fond of life anyway. Formal attire is strongly suggested.</p>
            <ReactTable 
              data={this.state.rosters.sort((a,b) => b.score - a.score)} 
              columns={columns(this.state.players)} 
              showPagination={false}
              showPageSizeOptions={false}
              resizable={false}
              sortable={false}
              pageSize={this.state.rosters.length}
              className='-striped -highlight'/>
          </Fade>
        </div>
      </div>
    )
  }
}
