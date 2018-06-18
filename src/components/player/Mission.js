import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { 
  getTeamData
} from '../../actions';
import { ifIphoneX } from '../IphoneXDetector';
import { MissionDeatail } from '../common';
import { PicDefault, Pass } from '../../images';
//import { Actions } from 'react-native-router-flux';

class Mission extends Component {

  componentWillMount() {
    this.props.getTeamData();
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
        
          }}
        />
      )
    );
  }

  render() {
    const { container, headerContainer, listContainer, titleStyle } = styles;
    return (
      <View style={container}>
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
    mission
   } = player;

  return { 
    done_submission, //完成幾個支線任務
    completed, //是否完成支線任務
    loading,
    mission
  };
};

export default connect(mapStateToProps, { getTeamData })(Mission);
