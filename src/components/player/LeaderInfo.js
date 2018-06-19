import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  WebView,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { 
  getTeamData, 
  careerCodeChanged, 
  careerGrowUp, 
  errorModalType 
} from '../../actions';
import { BackgroundImage, InputModal, Spinner } from '../common';
import { Biochemical, Defense, Sniper, Special, Soldier, Assault } from '../../images';
//import data from '../../Setting.json';

const { height, width } = Dimensions.get('window');

class LeaderInfo extends Component {

  state= {
    showModal: false
  };

  componentWillMount() {
    this.props.getTeamData();
  }

  onCareerCodeChange(text) {
    this.props.careerCodeChanged(text);
  }

  onCareerGrowUp(code) {
    this.props.careerGrowUp(code);
  }

  openExternalLink(req) {
    const isLocal = req.url.search('http://localhost') !== -1;
    if (isLocal) {
      return true;
    } else if (req.url.startsWith('https://')) {
     return true;
    }
      Linking.openURL(req.url);
      return false;
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

  renderChangeCareer() {
    const { 
      careerTextStyle,
      circle,
      circleContainerStyle
    } = styles;

    if (this.props.career.name === '戰士') {
      return (
        <View style={circleContainerStyle}>
          <View style={circle}>
            <Text 
              onPress={() => { this.setState({ showModal: true }); }} 
              style={careerTextStyle}
            >
              轉職
           </Text>
         </View>
       </View>
      );
    } 
      return (
        <View style={circleContainerStyle}>
          <View style={circle}>
            <Text 
              onPress={() => { this.props.errorModalType(true, this.props.career.description); }} 
              style={careerTextStyle}
            >
              職業介紹
           </Text>
         </View>
       </View>
      );
  }

  renderRadar() {
    const {
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
    } = this.props;

    if (this.props.batch === '大專') {
      return (
        <View style={{ flex: 2 }}>
          <WebView
              source={{ uri: `https://hsiangyu.com/RadarHTML/index.html?a=${passion}&b=${creativity}&c=${intelligence}&d=${love}&e=${patience}&f=1` }}
              style={{ marginTop: 1 }}
              onShouldStartLoadWithRequest={this.openExternalLink}
              scrollEnabled={false}
          />
      </View>
      );
    }
    return (
      <View style={{ flex: 2 }}>
        <WebView
            source={{ uri: `https://hsiangyu.com/RadarHTML/index.html?a=${strength}&b=${wisdom}&c=${vitality}&d=${faith}&e=${agility}&f=2` }}
            style={{ marginTop: 1 }}
            onShouldStartLoadWithRequest={this.openExternalLink}
            scrollEnabled={false}
        />
    </View>
    );
  }

  render() {
      const { 
        containerStyle
      } = styles;

      if (this.props.loading) {
        return (
          <Spinner />
        );
      } 
      
      return (
        <BackgroundImage style={containerStyle}>
          <InputModal
            titleText={'請輸入序號以驗證是否正確:'}
            visible={this.state.showModal}
            cancelButton
            scrollable={false}
            cancel={() => { this.setState({ showModal: false }); }}
            onPress={() => { 
              this.setState({ showModal: false });
              this.onCareerGrowUp(this.props.careerCode); 
            }}
            inputText
            value={this.props.careerCode}
            onChangeText={(text) => { this.onCareerCodeChange(text); }}
          />
          <InputModal
            titleText={this.props.errorText}
            textCustomStyle={
              (this.props.career.name === '戰士') 
              ? { textAlign: 'center' } : { textAlign: 'left' }
            }
            scrollable={(this.props.career.name !== '戰士')}
            visible={this.props.showErrorModal}
            onPress={() => { this.props.errorModalType(false, ''); }}
          />
          <View style={{ flex: 1 }}>
            {this.renderCareer()}
            {this.renderInfo()}
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {this.renderChangeCareer()}
            {this.renderRadar()}
          </View>       
        </BackgroundImage>
      );   
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
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
    fontSize: 16,
  },
  scoreTextStyle: {
    color: '#69AEB2',
    fontWeight: 'bold',
    fontSize: 23,
  },
  circleContainerStyle: {
    flex: 1,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: '#BBC3DC',
  },
  careerTextStyle: {
    paddingTop: 40,
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
    showErrorModal,
    errorText,
    loading
  };
};

export default connect(mapStateToProps, {
  getTeamData,
  careerCodeChanged,
  careerGrowUp,
  errorModalType
})(LeaderInfo);
