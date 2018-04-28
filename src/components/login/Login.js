import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { BackgroundImage } from '../common';

class Login extends Component {
  onClick() {
    Actions.teamInfo();
  }

  render() {
    return (
      <BackgroundImage style={styles.container}>
        <Text style={styles.textStyle} onPress={this.onClick}>LeaderInfo</Text>
      </BackgroundImage>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  textStyle: {
    color: 'green',
    padding: 50
  }
};

export default Login;
