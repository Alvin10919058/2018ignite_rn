import React, { Component } from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';
import { getTeamData } from '../../actions';
import { BackgroundImage } from '../common';
//import data from '../../Setting.json';

class LeaderInfo extends Component {

  componentWillMount() {
    this.props.getTeamData();
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

const mapStateToProps = ({ player }) => {
  const {  //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience//耐力
   } = player;

  return { 
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience//耐力
  };
};

export default connect(mapStateToProps, {
  getTeamData
})(LeaderInfo);
