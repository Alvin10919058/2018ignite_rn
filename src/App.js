import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  AsyncStorage
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Actions } from 'react-native-router-flux';
import ReduxThunk from 'redux-thunk';
import Parse from 'parse/react-native';
import data from './Setting.json';
import SceneRouter from './components/SceneRouter';
import { ifIphoneX } from './components/IphoneXDetector';
import reducers from './reducers';

const middleware = [
  ReduxThunk,
  __DEV__ && logger,
].filter(Boolean); // filter(Boolean) 會過濾掉false，但true會留著
class App extends Component {
  componentWillMount() {
    Parse.initialize(data.parseAppId);
    Parse.serverURL = data.parseServerURL;
    this.renderScene();
  }

  renderScene() {
    Parse.User.currentAsync()
    .then(async (currentUser) => {
      if (currentUser) {
        const sessionToken = currentUser.getSessionToken();
        await AsyncStorage.setItem('sessionToken', sessionToken);
        await AsyncStorage.setItem('userID', currentUser.id);
        Actions.main();
      } else {
        Actions.login();
      }
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(...middleware));
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
