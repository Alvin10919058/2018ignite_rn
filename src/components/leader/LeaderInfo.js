import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import { BackgroundImage } from '../common';

class LeaderInfo extends Component {
  onClick() {
    //Actions.teamInfo();
  }

  render() {
    const {
      container,
      textStyle,
      circleContainer,
      InfoContainer
    } = styles;
    return (
      <View style={container}>
        <View style={circleContainer}>
          <Text>1</Text>
        </View>
        <View style={InfoContainer}>
          <Text style={textStyle} onPress={this.onClick}>LeaderInfo</Text>
        </View>
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
    color: 'green',
    padding: 50
  },
  circleContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    backgroundColor: '#DDDDDD',
    borderColor: 'gray',
    borderStyle: 'solid',
    borderBottomRightRadius: 350,
    //borderTopRightRadius: 5,
    //borderBottomLeftRadius: 30,
    paddingBottom: 2
  },
  InfoContainer: {
    flex: 1
  }
};

export default LeaderInfo;
