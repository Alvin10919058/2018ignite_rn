import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { GeneralPage } from '../common';
import Content from './Content';

const text = 'HiHi';

// 修改上面的文字就行了

class CareerInfo extends Component {

  render() {
    return (
      <GeneralPage
        header={'各類職業介紹'}
        onPress={() => { Actions.pop(); }}
      >
        <Content content={text} />
      </GeneralPage>
    );
  }
}

export default CareerInfo;
