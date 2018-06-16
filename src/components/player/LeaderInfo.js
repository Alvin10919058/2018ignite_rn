import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { 
  getTeamData, 
  careerCodeChanged, 
  careerGrowUp, 
  codeModalType, 
  closeErrorModal 
} from '../../actions';
import { BackgroundImage, InputModal, Spinner } from '../common';
import { Biochemical, Defense, Sniper, Special, Soldier, Assault } from '../../images';
//import data from '../../Setting.json';

const { height, width } = Dimensions.get('window');

class LeaderInfo extends Component {

  componentWillMount() {
    this.props.getTeamData();
  }

  onCareerCodeChange(text) {
    this.props.careerCodeChanged(text);
  }

  onCareerGrowUp(code) {
    this.props.careerGrowUp(code);
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
    if (this.props.loading) {
      return (
        <Spinner />
      );
    } 
      const { 
        containerStyle,
        careerTextStyle
      } = styles;
      return (
        <BackgroundImage style={containerStyle}>
          <InputModal
            titleText={'請輸入序號以驗證是否正確:'}
            visible={this.props.showCodeModal}
            cancelButton
            cancel={() => { this.props.codeModalType(false); }}
            onPress={() => { this.onCareerGrowUp(this.props.careerCode); }}
            inputText
            value={this.props.careerCode}
            onChangeText={(text) => { this.onCareerCodeChange(text); }}
          />
          <InputModal
            titleText={this.props.errorText}
            visible={this.props.showErrorModal}
            onPress={() => { this.props.closeErrorModal(); }}
          />
          {this.renderCareer()}
          {this.renderInfo()}
          <View style={styles.circle}>
            <Text 
              onPress={() => { this.props.codeModalType(true); }} 
              style={careerTextStyle}
            >
              轉職
            </Text>
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
  careerTextStyle: {
    paddingTop: 50,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
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
    patience, //耐力

    //
    careerCode,
    showCodeModal,
    showErrorModal,
    errorText,
    loading
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
    patience, //耐力

    //
    careerCode,
    showCodeModal,
    showErrorModal,
    errorText,
    loading
  };
};

export default connect(mapStateToProps, {
  getTeamData,
  careerCodeChanged,
  careerGrowUp,
  codeModalType,
  closeErrorModal
})(LeaderInfo);
