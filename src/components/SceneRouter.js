import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';
import Login from './login/Login';
import LeaderInfo from './player/LeaderInfo';
import SettingPage from './player/SettingPage';
import Rank from './player/Rank';
import Mission from './player/Mission';
import Skills from './player/Skills';
import { ifIphoneX } from './IphoneXDetector';

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar />
          </Scene>
          <Scene key="main" initial>
            <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle}>

              <Scene key="tab0" title="排名">
                <Scene key="rank" initial component={Rank} hideNavBar />
              </Scene>
              <Scene key="tab1" title="配點">
                <Scene key="skills" initial component={Skills} hideNavBar />
              </Scene>
              <Scene key="tab2" initial title="首頁">
                <Scene key="teamInfo" initial component={LeaderInfo} hideNavBar />
              </Scene>
              <Scene key="tab3" title="支線任務">
                <Scene key="mission" initial component={Mission} hideNavBar />
              </Scene>
              <Scene key="tab4" title="設定">
                <Scene key="settingPage" initial component={SettingPage} hideNavBar />
              </Scene>        

            </Scene>
          </Scene>
        </Stack>
      </Router>
    );
  }
}

const styles = {
  tabBarStyle: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        ...ifIphoneX({
          paddingBottom: 34,
          height: 83
        },
        {
          paddingBottom: 0
        }),
        shadowColor: '#CBD4E4',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 } // 左右不要有陰影
      },
      android: {
        elevation: 8
      }
    })
  }
};

export default RouterComponent;
