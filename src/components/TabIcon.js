import React, { Component } from 'react';
import { Image } from 'react-native';
import { RankTab, SettingTab, MisionTab, HomePageTab, SkillsTab }  from '../images';

class TabIcon extends Component {

  render() {
    const { tabIcon } = styles;

    let active = '';
    //let disable = '';

    switch (this.props.title) {
      case '排名': {
        active = RankTab;
        break;
      }
      case '配點': {
        active = SkillsTab;
        break;
      }
      case '支線任務': {
        active = MisionTab;
        break;
      }
      case '設定': {
        active = SettingTab;
        break;
      }
      default:
      {
        active = HomePageTab;
        break;
      }
    }
    if (this.props.selected) {
      return (
        <Image style={tabIcon} source={active} />
      );
    }

    return (
      <Image style={tabIcon} source={active} />
    );
	}
}


const styles = {

  tabIcon: {
    flex: 1,
    width: 28,
    resizeMode: Image.resizeMode.contain
  }
};

export default TabIcon;
