import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { CardList } from '../common';
import { Logo } from '../../images';

const { height, width } = Dimensions.get('window');
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
    const { container, cardListStyle, cardListCustom, listTextStyle } = styles;
    return (
     
      <View style={container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image
              style={{ 
                height: width / 2,
                width: width / 2,
                borderRadius: width / 6,
                alignSelf: 'center',
                alignItems: 'center'
              }}
              source={Logo}
          />
        </View>
        <ScrollView style={cardListStyle}>
            <CardList
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              onPress={null} 
              onPress={() => {
                Actions.careerInfo();
              }} 
              cardText={'各類職業介紹'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              onPress={null} 
              onPress={() => {
                Actions.mp();
              }} 
              cardText={'MissionPop 交戰守則'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              onPress={() => {
                Actions.about();
              }}  
              cardText={'關於APP'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              onPress={null} 
              onPress={() => {
                Actions.policy();
              }} 
              cardText={'隱私權政策'} 
            />
            <CardList 
              listCustomStyle={cardListCustom}
              listTextStyle={listTextStyle}
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
    backgroundColor: '#fff'
  },
  cardListStyle: {
    flex: 1, 
    borderTopWidth: 0.5, 
    borderTopColor: '#AAAAAA',
    backgroundColor: '#FBFBFB'
  },
  cardListCustom: {
    paddingHorizontal: 15,
    marginTop: height * 0.001,
    marginBottom: height * 0.001
  },
  listTextStyle: {
    fontSize: 16
  }
};

export default SettingPage;
