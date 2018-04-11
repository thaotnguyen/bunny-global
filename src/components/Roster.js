import React from 'react';

export default class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { uid: '' };
  }

  componentDidMount() {
    window.FB.getLoginStatus(res => this.setState({ uid: res.authResponse.userID }));
  }

  render() {
    return (
      <div className='roster'>
        <h1>Rosters</h1>
      </div>
    )
  }
}
