import React, { Component } from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { BackgroundImage } from '../common';
import data from '../../Setting.json';

class LeaderInfo extends Component {

  componentWillMount() {
    this.apiExample();
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

  async apiExample() {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    const userID = await AsyncStorage.getItem('userID');

    const params = {
        include: 'career',
        //limit: 1000,
        where: {
          user: {
            __type: 'Pointer',
            className: '_User',
            objectId: userID
          },
        }
      };
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
        .join('&');
    fetch(`${data.parseServerURL}/classes/Team?${query}`, {
      method: 'GET',
      headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
        'X-Parse-Session-Token': sessionToken
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
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
