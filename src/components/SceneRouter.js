import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './login/Login';
import LeaderInfo from './leader/LeaderInfo';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar />
          </Scene>
          <Scene key="teamInfo" component={LeaderInfo} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
