import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Parse from 'parse/react-native';
import { connect } from 'react-redux';
import { getTeamData } from '../../actions';
import { BackgroundImage } from '../common';
import { Biochemical, Defense, Sniper, Special, Soldier, Assault } from '../../images';
//import data from '../../Setting.json';

const { height, width } = Dimensions.get('window');

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

  renderCareer() {
    const { careerStyle } = styles;
    if (this.props.career.name === '戰士') {
      return (
        <Image
        source={Soldier}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '特勤部隊') {
        return (
          <Image
          source={Special}
          style={careerStyle}
          />
        );
    } else if (this.props.career.name === '急襲部隊') {
        return (
          <Image
          source={Assault}
          style={careerStyle}
          />
        );
    } else if (this.props.career.name === '狙擊部隊') {
      return (
        <Image
        source={Sniper}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '防禦部隊') {
      return (
        <Image
        source={Defense}
        style={careerStyle}
        />
      );
    } else if (this.props.career.name === '生化小組') {
      return (
        <Image
        source={Biochemical}
        style={careerStyle}
        />
      );
    } 
  }

  renderInfo() {
    const { 
      teamTextStyle, 
      scoreTextStyle, 
      infoStyle,
      infoStyle2 
    } = styles;

    return (
      <View 
        style={
          (this.props.career.name === '戰士' || this.props.career.name === '生化小組')
          ? infoStyle2 : infoStyle
        }
      >
        <Text style={teamTextStyle}>TEAM {this.props.name}</Text>
        <Text style={scoreTextStyle}>{this.props.team_total_score} POINT</Text>
      </View>
    );
  }

  render() {
    const { 
      containerStyle
    } = styles;
    return (
      <BackgroundImage style={containerStyle}>
        {this.renderCareer()}
        {this.renderInfo()}
        <View style={styles.circle}>
      	  <Text onPress={this.logout.bind(this)} style={{ textAlign: 'center' }}>test</Text>
        </View>
      </BackgroundImage>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  careerStyle: {
    height: height / 1.1,
    width: width / 1.1,
    resizeMode: Image.resizeMode.contain
  },
  infoStyle: {
    position: 'absolute',
    left: width / 2.5,
    top: height / 8.5,
  },
  infoStyle2: {
    position: 'absolute',
    left: width / 2.9,
    top: height / 8.5,
  },
  teamTextStyle: {
    color: '#69AEB2',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
    //fontFamily: 'GillSans-SemiBold'
  },
  scoreTextStyle: {
    color: '#69AEB2',
    fontWeight: 'bold',
    fontSize: 23,
    //fontFamily: 'GillSans-SemiBold'
  },
  circle: {
    position: 'absolute',
    left: width / 20,
    top: height / 2,
    borderRadius: 60,
    width: 120,
    height: 120,
    backgroundColor: '#BBC3DC',
  },
};

const mapStateToProps = ({ player }) => {
  const {  
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業

    //國高能力值
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
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業

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
