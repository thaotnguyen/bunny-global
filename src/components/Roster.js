import axios from 'axios';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import $ from 'jquery';
import Cookies from 'js-cookie';

import "react-table/react-table.css";

const url = 'https://api.myjson.com/bins/16kho3';

const columns = [
  {
    Header: 'Owner',
    accessor: 'name',
    Cell: row => row.value.split(' ')[0],
  },
  {
    Header: 'Team',
    accessor: 'team',
    Cell: row => row.value.map(entry => <div>{entry.tag}</div>),
  },
  {
    Header: 'Score',
    accessor: 'score',
    Cell: row => '-',
  }
];

export default class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: true, status: '', uid: '', accessToken: '', name: '', rosters: [] };
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
      .then(res => this.setState({ rosters: res.data.rosters }));
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
            {this.state.rosters.map(roster => roster.name).includes(this.state.name) 
              ? '' 
              : <Link to='/create'><div className='button'>Create a roster</div></Link>}
            <ReactTable 
              data={this.state.rosters} 
              columns={columns} 
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
