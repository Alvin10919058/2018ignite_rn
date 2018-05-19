import React, { Component } from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './login/Login';
import LeaderInfo from './player/LeaderInfo';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar />
          </Scene>
          <Scene key="main" initial>
            <Scene key="teamInfo" initial component={LeaderInfo} hideNavBar />
          </Scene>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
