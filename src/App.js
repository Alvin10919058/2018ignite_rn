import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform
} from 'react-native';
import SceneRouter from './components/SceneRouter';
import { ifIphoneX } from './components/IphoneXDetector';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
        />
        <View style={styles.statusBarStyle} />
        <SceneRouter />
      </View>
    );
  }
}

const styles = {
  statusBarStyle: {
    ...Platform.select({
      ios: {
        ...ifIphoneX({
          paddingTop: 44,
          height: 18,
          backgroundColor: 'white'
        },
        {
          paddingTop: 20,
          height: 18,
          backgroundColor: 'white'
        })
      },
      android: {
        height: 0
      }
    })
  }
};

export default App;
