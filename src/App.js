import React, { Component } from 'react';
import api_config from './api/api_config';
import {load, updateCell} from './api/spreadsheet';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cars: [],
      error: null
    }
  };

  componentDidMount() {
    window.gapi.load("client:auth2", this.initClient)
    // window.gapi.load("auth2", this.initAuth)
  };

  initClient = () => {
    window.gapi.client.init({
      apiKey: api_config.apiKey,
      discoveryDocs: api_config.discoveryDocs,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      clientId: "865767011202-po9sskitiv9unrjvdb2srumh62n3qnev.apps.googleusercontent.com"
    })
    .then(() => {
      // window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      // updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
    .then(() => {
      load(this.onLoad);
      updateCell();
    })
  };

  handleSignInClick = (event) => {
    window.gapi.auth2.getAuthInstance().signIn();
  }

  handleSignOutClick= (event) => {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  onLoad = (data, error) => {
    if (data) {
      const cars = data.cars;
      this.setState({ cars });
    } else {
      this.setState({ error });
    }
  };

  render() {
    return (
      <div className="App">
        <button id="signin-button" onClick={this.handleSignInClick}>Sign in</button>
        <button id="signout-button" onClick={this.handleSignOutClick}>Sign out</button>
      </div>
    );
  }
}

export default App;
