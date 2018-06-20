import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { CardList } from '../common';

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
    const { container, CardListStyle, listTextStyle } = styles;
    return (
     
      <View style={container}>
        <ScrollView>
            <CardList 
              listCustomStyle={CardListStyle}
              listTextStyle={listTextStyle}
              onPress={() => {
                Actions.careerInfo();
                }
              } 
              cardText={'各類職業介紹'} 
            />
            <CardList 
              listCustomStyle={CardListStyle}
              listTextStyle={listTextStyle}
              onPress={() => {
                Actions.mp();
                }
              } 
              cardText={'MissionPop 交戰守則'} 
            />
            <CardList 
              listCustomStyle={CardListStyle}
              listTextStyle={listTextStyle}
              onPress={() => {
                Actions.about();
                }
              } 
              cardText={'關於作者'} 
            />
            <CardList 
              listCustomStyle={CardListStyle}
              listTextStyle={listTextStyle}
              onPress={() => {
                Actions.policy();
                }
              } 
              cardText={'隱私權政策'} 
            />
            <CardList 
              listCustomStyle={CardListStyle}
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
      backgroundColor: 'white'
  },
  CardListStyle: {
    borderWidth: 1, 
    borderColor: '#dddddd',
    paddingHorizontal: 15,
    marginTop: height * 0.001,
    marginBottom: height * 0.001
  },
  listTextStyle: {
    fontSize: 18
  }
};

export default SettingPage;
