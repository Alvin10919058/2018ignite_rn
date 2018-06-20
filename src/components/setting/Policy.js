import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { GeneralPage } from '../common';
import Content from './Content';

const text = 'Dear members,\n\nThis will be the simplest privacy policy you’ve never seen before. (We believe that it’s just wasting your time if we make another normal version that you can see everywhere.) But we do know that you pretty care about your privacy.\n\nSo, let`s just make it very simple but keep clear.\n\n----\n\nWhen you sign up to ignite and become one of our user, that represents you allow ignite to use all information that you give/upload/send via ignite. We promise that your data will never be used badly, illegally, or wrongly, but if one day you no longer want to let us keep your data, you can email to our support team and tell us that you`d like to delete your account, we’ll help you delete all of your data and account promptly at your command.\n\n\nSincerely,\nignite team';

// 修改上面的文字就行了

class Policy extends Component {

  render() {
    return (
      <GeneralPage
        header={'隱私權政策'}
        onPress={() => { Actions.pop(); }}
      >
        <Content content={text} />
      </GeneralPage>
    );
  }
}

export default Policy;
