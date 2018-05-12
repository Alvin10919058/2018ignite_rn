import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { BackgroundImage } from '../common';

class Login extends Component {
  onClick() {
    Actions.teamInfo();
  }

  render() {
    const { container, textStyle, circle } = styles;
    return (
      <View style={container}>
        <View style={circle}>
          <Text>1</Text>
        </View>
        <Text style={textStyle} onPress={this.onClick}>LeaderInfo</Text>
      </View>
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
  },
  circle: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    backgroundColor: '#f76260',
    borderColor: 'green',
    borderStyle: 'solid',
    borderRadius: 15,
    paddingBottom: 2
  }
};

export default Login;
