import axios from 'axios';
import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import $ from 'jquery';

const url = 'https://api.myjson.com/bins/16kho3';

const toFixed = (num, fixed) => {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  let result = Math.floor(num * fixed) / fixed;
  if (result % 1 === 0) {
    return `$${result}.00`;
  } else {
    return `$${result}0`;
  }
}

export default class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loggedIn: true,
      status: '', 
      uid: '', 
      accessToken: '', 
      name: '', 
      players: [], 
      selected: [], 
      money: 7,
    };
    $(window).scroll(function() {
      var scrolledY = $(window).scrollTop();
      $('.header-container').css('background-position', 'left ' + ((scrolledY)) + 'px');
    });
  }

  columns = () => [
    {
      Header: '',
      accessor: 'tag',
      filterable: false,
      width: '25px',
      Cell: row => <input 
        type='checkbox' 
        checked={this.isSelected(row.original.tag)}
        onChange={() => this.toggleSelect(row.value, row.original.value)} /> 
    },
    {
      Header: 'Tag',
      accessor: 'tag',
      Cell: row => row.original.twitter
        ? <div><a href={`https://www.twitter.com/${row.original.twitter}`}><div className='table-tag'>{row.value}</div></a><div className='table-name'>{row.original.name}</div></div>
        : <div><div className='table-tag'>{row.value}</div><div className='table-name'>{row.original.name}</div></div>

    },
    {
      Header: 'Value',
      accessor: 'value',
      Cell: row => toFixed(row.value, 2),
    },
    {
      Header: 'Score',
      accessor: 'score',
      Cell: row => '-',
    }
  ];

  toggleSelect = (name, value) => {
    console.log(this.state.money, value);
    if (this.state.selected.includes(name)) {
      this.setState(state => {
        return { 
          selected: state.selected.filter(x => x !== name), 
          money: (state.money*10 + value*10)/10, 
        };
      });
    } else {
      if (this.state.money <= 0 || this.state.selected.length >= 8) {
        return;
      }
      this.setState(state => {
        return { 
          selected: state.selected.concat([name]),
          money: (state.money*10 - value*10)/10, 
        };
      })
    }  
  }

  isSelected = (value) => {
    return this.state.selected.includes(value);
  }

  submit = () => {
    axios.get(url)
    .then(res => {
      const rosters = res.data.rosters;
      const newRoster = {
        name: this.state.name,
        team: this.state.selected.map(x => {return {tag: x}}),
        value: this.state.money,
      }
      let newRosters = rosters.concat([newRoster]);
      console.log({ players: res.data.players , roster: newRosters});
      axios.put(url, { players: res.data.players, rosters: newRosters })
        .then(() => { window.location.replace('/roster');})
    });
  }

  updateLoggedInState = (res) => {
    if (res.status !== 'connected') {
      window.location.replace('/');
    } else {
      console.log("!");
      let name = '';
      axios.get(`https://graph.facebook.com/${res.authResponse.userID}?access_token=${res.authResponse.accessToken}`)
        .then((response) => {
          if (response.data.name) {
            name = response.data.name;
          }
        })
        .then(() => this.setState({ 
          status: res.status,
          uid: res.authResponse.userID, 
          accessToken: res.authResponse.accessToken, 
          name: name,
        }));
    }
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '1754098981316904',
        status           : true,
        cookie           : true,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });

      window.FB.getLoginStatus(function(response) {
        this.updateLoggedInState(response);
      }.bind(this));

      window.FB.Event.subscribe('auth.statusChange', (res) => {
        this.updateLoggedInState(res);
      })
    }.bind(this);

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1754098981316904&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    axios.get(url)
      .then(res => this.setState({ players: res.data.players }));
  }

  render() {    
    const checkboxProps = {
      getTrProps: (s, r) => {
        const selected = this.isSelected(r.original.tag);
        return {
          style: {
            backgroundColor: selected 
              ? "lightgreen" 
              : r.index % 2 === 0 
                ? 'rgba(0, 0, 0, 0)'
                : 'rgba(0, 0, 0, 0.03)'
          }
        };
      }
    }

    return(
      <div className='create-page'>
        <div className='container'>   
          <div className='header-container'>
            <Fade right duration={500} distance='50px'>
              <h1>Create</h1>
            </Fade>  
          </div>
          <Fade right duration={500} distance='50px'>
            <p>You’re the manager! Build the strongest roster from the entire field of Paul D's Funeral tournament entrants with a fixed salary cap. Players score points based on the performance of their roster in the actual tournament.</p>
            <p>You have $7.00 to buy a roster and you must pick 8 people and use all of your money exactly.</p>
            <h1 className={this.state.money < 0 ? 'invalid' : ''}>{toFixed(this.state.money, 2)}</h1>
            <div className='money-left'>MONEY LEFT</div>
            <ReactTable 
              data={this.state.players}
              columns={this.columns()} 
              showPagination={false}
              showPageSizeOptions={false}
              resizable={false}
              sortable={false}
              pageSize={this.state.players.length}
              {...checkboxProps}
              className='-striped -highlight'/>
              <div 
                className={this.state.money !== 0 || this.state.selected.length !== 8 || !this.state.name ? 'button disabled' : 'button'}
                onClick={this.submit}
              >
                Submit
              </div>
          </Fade>
        </div>
      </div>
    )
  }
}