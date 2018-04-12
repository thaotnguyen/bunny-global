import axios from 'axios';
import React from 'react';

export default class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: '', uid: '', accessToken: '', name: '' };
  }

  componentDidMount() {
    window.FB.getLoginStatus(res => {
      if (res.status !== 'connected') {
        window.location.replace('/');
      } else {
        axios.get(`https://graph.facebook.com/${res.authResponse.userID}?access_token=${res.authResponse.accessToken}`, (res) => {
          if (res.name) {
            this.setState({ name: res.name });
          }
        });
        this.setState({ 
          status: res.status,
          uid: res.authResponse.userID, 
          accessToken: res.authResponse.accessToken, 
        });
      }
    });
  }

  render() {
    return (
      <div className='roster'>
        <h1>Rosters</h1>
      </div>
    )
  }
}
