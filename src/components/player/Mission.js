import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { ifIphoneX } from '../IphoneXDetector';
//import { Actions } from 'react-native-router-flux';

class Mission extends Component {

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

export default Mission;
