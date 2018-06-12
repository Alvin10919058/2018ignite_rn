import React, { Component } from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { BackgroundImage } from '../common';
//import data from '../../Setting.json';

class LeaderInfo extends Component {

  componentWillMount() {

  }

  logout() {
    Parse.User.logOut()
      .then(async () => {
        await AsyncStorage.removeItem('sessionToken');
        await AsyncStorage.removeItem('userID');
        Actions.pop();
        Actions.login();
        Parse.User.current();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { containerStyle } = styles;
    return (
      <BackgroundImage style={containerStyle}>
        <Text onPress={this.logout.bind(this)}>LogOut</Text>
      </BackgroundImage>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  }
};

export default LeaderInfo;
