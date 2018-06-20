import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { GeneralPage } from '../common';
import Content from './Content';

const text = 'HiHi';

// 修改上面的文字就行了

class About extends Component {

  render() {
    return (
      <GeneralPage
        header={'關於APP'}
        onPress={() => { Actions.pop(); }}
      >
        <Content content={text} />
      </GeneralPage>
    );
  }
}

export default About;
