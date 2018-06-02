import React, { Component } from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { BackgroundImage } from '../common';

class LeaderInfo extends Component {

  logout() {
    Parse.User.logOut()
      .then(async () => {
        await AsyncStorage.removeItem('sessionToken');
        await AsyncStorage.removeItem('userID');
        Actions.pop();
        Parse.User.current();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <BackgroundImage>
        <Text onPress={this.logout.bind(this)}>LogOut</Text>
      </BackgroundImage>
    );
  }
}

const styles = {
  
};

export default LeaderInfo;
