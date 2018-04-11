/*global FB*/

import React from 'react';

export default class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = { uid: '', name: '' };
  }

  componentDidMount() {
    const self = this;
    window.fbAsyncInit = function() {
      const selfCopy = self;
      window.FB.init({
        appId            : '1754098981316904',
        cookie           : true,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });

      FB.getLoginStatus(function(res) {
        console.log(res);
        selfCopy.setState({ uid: res.authResponse.userID, name: response.username });
      }.bind(this));
    }.bind(this);

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1754098981316904&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div className='roster'>
        <h1>Rosters</h1>
      </div>
    )
  }
}
