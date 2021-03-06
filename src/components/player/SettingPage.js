import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { CardList, InputModal } from '../common';
import { Logo } from '../../images';

const { height, width } = Dimensions.get('window');
class SettingPage extends Component {

  state = {
    showModal: false
  }

  logout() {
    Parse.User.logOut()
      .then(async () => {
        await AsyncStorage.removeItem('sessionToken');
        await AsyncStorage.removeItem('userID');
        await AsyncStorage.removeItem('teamID');
        await AsyncStorage.removeItem('gm_batch');
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
         <InputModal
            titleText={'不要點我！\n(／‵Д′)／~ ╧╧'}
            scrollable={false}
            visible={this.state.showModal}
            onPress={() => { this.setState({ showModal: false }); }}
         />
        <TouchableOpacity 
          onPress={() => { this.setState({ showModal: true }); }} 
          style={{ flex: 0.5, justifyContent: 'center' }}
        >
          <Image
              style={{ 
                height: width / 3,
                width: width / 3,
                borderRadius: width / 9,
                alignSelf: 'center',
                alignItems: 'center'
              }}
              source={Logo}
          />
        </TouchableOpacity>
        <ScrollView style={cardListStyle}>
            <CardList
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              arrow
              onPress={() => {
                Actions.careerInfo();
              }} 
              cardText={'各類職業介紹'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              arrow
              onPress={() => {
                Actions.mp();
              }} 
              cardText={'MissionPop 交戰守則'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              arrow
              onPress={() => {
                Actions.about();
              }}  
              cardText={'關於APP'} 
            />
            <CardList 
              listCustomStyle={cardListCustom} 
              listTextStyle={listTextStyle}
              arrow
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
    flex: 2, 
    //borderTopWidth: 0.5, 
    //borderTopColor: '#AAAAAA',
    //backgroundColor: '#FBFBFB'
    backgroundColor: '#ffffff'
  },
  cardListCustom: {
    paddingHorizontal: 15,
    marginTop: height * 0.002,
    marginBottom: height * 0.002,
    backgroundColor: '#ffffff',
    borderWidth: 1, 
    borderColor: '#eeeeee',
  },
  listTextStyle: {
    fontSize: 16
  }
};

export default SettingPage;
