import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { CardList } from '../common';

class SettingPage extends Component {

  logout() {
    Parse.User.logOut()
      .then(async () => {
        await AsyncStorage.removeItem('sessionToken');
        await AsyncStorage.removeItem('userID');
        await AsyncStorage.removeItem('teamID');
        Actions.pop();
        Actions.login();
        Parse.User.current();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { container } = styles;
    return (
     
      <View style={container}>
        <ScrollView>
            <CardList 
              listCustomStyle={{ backgroundColor: 'gray' }}
              listTextStyle={{ fontSize: 20 }}
              onPress={null} 
              cardText={'各類職業介紹'} 
            />
            <CardList 
              onPress={null} 
              cardText={'關於作者'} 
            />
            <CardList 
              onPress={null} 
              cardText={'隱私權政策'} 
            />
            <CardList 
              onPress={this.logout.bind(this)} 
              cardText={'登出'} 
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
      flex: 1,
      backgroundColor: 'white'
  }
};

export default SettingPage;
