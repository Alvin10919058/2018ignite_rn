import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import data from './Setting.json';
import SceneRouter from './components/SceneRouter';
import { ifIphoneX } from './components/IphoneXDetector';
import reducers from './reducers';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: data.apiKey,
      authDomain: data.authDomain,
      databaseURL: data.databaseURL,
      storageBucket: data.storageBucket,
      messagingSenderId: data.messagingSenderId
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar
              backgroundColor="white"
              barStyle="dark-content"
          />
          <View style={styles.statusBarStyle} />
          <SceneRouter />
        </View>
      </Provider>
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
