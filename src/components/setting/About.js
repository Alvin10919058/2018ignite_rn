import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { GeneralPage } from '../common';
import Content from './Content';

const text = 

'2018火把青年特會IGNITE：\n\n'
+
'特務三部曲之二部曲 C.O.D.E BLUE 破曉行動\n'
+
'如果在你所認知的世界裡，少一個元素或多一個元素，還會是同一個世界嗎? 世界上有許多的元素，卻無人能創造出一個穩定的人工合成元素，但「他」做到了。 沒人清楚他的身分，只知道恐怖組織早一步下令全面追緝了，通過特務學院訓練的你，正面臨世界空前絕後的危機，趕緊收好行囊、準備好上場了嗎?\n\n' 
+
'關於作者：\n\n' +
'李孟霈 Adam\n' +
'輔大資工研究生\n' +
'現在在tico新創寫APP，也在Teach for Taiwan IT當打雜志工，不知道研究所能不能畢業。\n\n' +

'楊育承 Alvin\n' +
'台灣的大學輔仁分校資工系輔修幹話系上屆畢業生\n' +
'現在擔任前端工程師，跟樓上一起在TFT當雜工，這是我們花了好幾天爆肝寫出來的哦！\n' + 
'希望大家玩得開心～ <3\n' +
'有問題就打這支電話：0987016673\n' + 
'李先生很高興會為大家服務！\n\n';

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
