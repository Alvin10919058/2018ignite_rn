import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { BackgroundImage } from '../common';

class TeamInfo extends Component {
  render() {
    return (
      <BackgroundImage>
        <View style={styles.container} />      
     </BackgroundImage>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default TeamInfo;
