import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { 
  getTeamData,
  codeModalType,
  errorModalType,
  missionCodeChanged
} from '../../actions';
import { ifIphoneX } from '../IphoneXDetector';
import { MissionDeatail, Spinner, InputModal } from '../common';
import { PicDefault, Pass } from '../../images';
//import { Actions } from 'react-native-router-flux';

class Mission extends Component {

  componentWillMount() {
    this.props.getTeamData();
  }

  onMissionCodeChange(text) {
    this.props.missionCodeChanged(text);
  }

  renderMission() {
    return this.props.mission.map(
      mission => (
        <MissionDeatail
          key={mission.id}
          missionName={mission.missionName}
          image={
            (mission.finished === true)
              ? Pass
              : PicDefault
          }
          addType={mission.finished}
          onPress={() => {
            if (mission.finished === false) {
              this.props.codeModalType(true);
            }
          }}
        />
      )
    );
  }

  render() {
    const { container, headerContainer, listContainer, titleStyle } = styles;

    if (this.props.loading) {
      return (
        <Spinner />
      );
    } 
    
    return (
      <View style={container}>
         <InputModal
           titleText={'請輸入序號以驗證是否正確:'}
           visible={this.props.showCodeModal}
           cancelButton
           scrollable={false}
           cancel={() => { this.props.codeModalType(false); }}
           onPress={() => { }}
           inputText
           value={this.props.missionCode}
           onChangeText={(text) => { this.onMissionCodeChange(text); }}
         />
         <InputModal
           titleText={this.props.errorText}
           scrollable={false}
           visible={this.props.showErrorModal}
           onPress={() => { this.props.errorModalType(false, ''); }}
         />
        <View style={headerContainer}>
          <Text>支線任務</Text>
        </View>
        <View style={listContainer}>
          <ScrollView style={{ paddingTop: 10 }}>
            <View>
              <Text style={titleStyle}>
                任務列表
              </Text>
            </View>
            {this.renderMission()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
      flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#bbb'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    ...ifIphoneX({
      paddingBottom: 33
    })
  },
  titleStyle: {
    color: '#bbb',
    fontSize: 14,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10
  },
};

const mapStateToProps = ({ player }) => {
  const {  
    done_submission, //完成幾個支線任務
    completed, //是否完成支線任務
    loading,
    showCodeModal,
    showErrorModal,
    errorText,
    mission,
    missionCode
   } = player;

  return { 
    done_submission, //完成幾個支線任務
    completed, //是否完成支線任務
    loading,
    showCodeModal,
    showErrorModal,
    errorText,
    mission,
    missionCode
  };
};

export default connect(mapStateToProps, { 
  getTeamData,
  codeModalType,
  errorModalType,
  missionCodeChanged
})(Mission);
