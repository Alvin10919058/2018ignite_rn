import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { GeneralPage } from '../common';
import Content from './Content';

const text = 
'\n' +
'1. 善用掩蔽物，團隊合作才是致勝關鍵。\n' +
'2. 勝負關鍵不一定在奪旗兵身上，先擊殺醫療兵有時比奪旗兵還重要。\n' +
'3. 先掌握對手的位置，尤其是奪旗兵，不要顧著射擊。\n' +
'4. 若奪旗兵陣亡後無法治癒，則獲勝條件則為「殲滅對手全體成員」。\n' +
'5. 被擊倒的特務需原地蹲下不可移動。\n' +
'6. 發射後的子彈可重複拾取填裝。\n' +
'7. 除狙擊兵及陸戰兵外，其餘兵種皆不得使用槍枝。\n' +
'8. 除防禦兵外，其餘兵種不得使用盾牌。\n' +
'9. 叛亂分子擊倒的特務不算死亡，需要立即回重生點等待訓練重新開始。\n' +
'10.敵方來襲時，若本來陣亡的特務，仍需原地蹲下，直到被救援為止。\n';

// 修改上面的文字就行了

class MP extends Component {

  render() {
    return (
      <GeneralPage
        header={'MissionPop 交戰守則'}
        onPress={() => { Actions.pop(); }}
      >
        <Content content={text} />
      </GeneralPage>
    );
  }
}

export default MP;
