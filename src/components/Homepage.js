import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { status: '', uid: '', accessToken: '', name: '' };
  }

  handleVoteClick = () => {
    document.getElementsByClassName('vote-container')[0].scrollIntoView({ behavior: 'smooth' });
  }

  auth_callback = (res) => {
    window.location.reload(true);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId            : '1754098981316904',
        status           : true,
        cookie           : true,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.12'
      });

      window.FB.Event.subscribe('auth.login', this.auth_callback);

      window.FB.getLoginStatus((res) => {
        axios.get(`https://graph.facebook.com/${res.authResponse.userID}?access_token=${res.authResponse.accessToken}`)
          .then((response) => {
            if (response.data.name) {
              this.setState({ 
                status: res.status,
                uid: res.authResponse.userID, 
                accessToken: res.authResponse.accessToken, 
                name: response.data.name,
              })
            }
          })
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=1754098981316904&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
    
  render() {
    console.log(this.state.name);
     return ( 
      <div className='homepage'>
      <div id="fb-root"></div>
        <div className='container'>
          <video autoPlay muted loop>
            <source src={`video/${Math.floor(Math.random() * 9)}.mp4`} type='video/mp4'/>
          </video>
          <div className='title'>BUNNY GLOBAL</div>
          <img src='img/logo2.png' alt=''/>
          { this.state.name
            ? <Link to='/roster'><div className='create'>CREATE A ROSTER</div></Link>
            : <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>}
        </div>
      </div>
    );
  };
}
