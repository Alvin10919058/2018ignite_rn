import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
//import { Actions } from 'react-native-router-flux';

class Mission extends Component {

  render() {
    const { container } = styles;
    return (
      <View style={container}>
        <Text>Mission</Text>
      </View>
    );
  }
}

const styles = {
  container: {
      flex: 1
  }
};

export default Mission;
