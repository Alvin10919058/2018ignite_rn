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
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    flex: 1,
    color: 'green',
    padding: 50
  },
  circle: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    backgroundColor: '#DDDDDD',
    borderColor: 'gray',
    borderStyle: 'solid',
    borderBottomRightRadius: 350,
    //borderTopRightRadius: 5,
    //borderBottomLeftRadius: 30,
    paddingBottom: 2
  }
};

export default Login;
