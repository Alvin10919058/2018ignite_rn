import React, { Component } from 'react';
import {
  View
} from 'react-native';
import SceneRouter from './components/SceneRouter';

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SceneRouter />
      </View>
    );
  }
}

export default App;
