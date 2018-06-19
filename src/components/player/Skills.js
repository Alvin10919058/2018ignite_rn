import React, { Component } from 'react';
import {
  View,
  Text,
  AsyncStorage,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component';
import data from '../../Setting.json';
import { Button } from '../common';
import { Add, Sub } from '../../images';

//import { Actions } from 'react-native-router-flux';

const { height, width } = Dimensions.get('window');

// 重要註解！！！

// table資料要放入從資料庫撈出來的目前小隊各能力值:
// tableData: [
//   [目前信心, 目前敏捷, 目前力量, 目前智慧, 目前體力]
// ],

// tmp開頭變數為存放使用者配點時點擊 加 或 減 的暫存
// 最後按 確定按鈕 後要寫入資料庫中 （ 可更改getTeam()系列 來完成 ）

// 重置功能尚未實作

class Skills extends Component {
  state = { 
    tableHead: ['信心', '敏捷', '力量', '智慧', '體力'],
    tableData: [
      [17, 36, 42, 12, 28]
    ],

    tmpFaith: 0,
    tmpAgility: 0,
    tmpStrength: 0,
    tmpWisdom: 0,
    tmpVitality: 0,

    batch: '國高',
    free_point: 50,
  }
   
   //getTeam 成功會call putTeam() putTeam 成功會call postTeam()
  //value: 要給幾點, kinds: 哪種類別
  getTeam(batch, teamName, value, kinds) {
    const params = {
        where: {
          batch,
          name: teamName
        }
    };
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
        .join('&');
    fetch(`${data.parseServerURL}/classes/Team?${query}`, {
    method: 'GET',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
    }
    })
    .then((response) => response.json())
    .then(async (responseData) => {
        console.log(responseData);
        console.log(responseData.results[0][kinds]);
        this.putTeam(
          responseData.results[0].objectId, 
          batch, 
          value, 
          kinds, 
          responseData.results[0][kinds]
        );
    })
    .catch((error) => {
        console.log(error);
    });
  }

  //value: 要給幾點, kinds: 哪種類別, originalValue: 原來類別的分數
  putTeam(teamID, batch, value, kinds, originalValue) {
    const params = {
        
    };

    params[kinds] = originalValue + value;
    
    fetch(`${data.parseServerURL}/classes/Team/${teamID}`, {
    method: 'PUT',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
    },
    body: JSON.stringify(params)
    })
    .then((success) => {
      console.log(success);
      this.postPoint(teamID, batch, value, kinds);
    })
    .catch((err) => {
    console.log(err);// error handling ..
    });
  }

  //value: 要給幾點, kinds: 哪種類別
  async postPoint(teamID, batch, value, kinds) {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    const userID = await AsyncStorage.getItem('userID');

    const params = {
      to_team: {
          __type: 'Pointer',
          className: 'Team',
          objectId: teamID
        },
      from_gm: {
          __type: 'Pointer',
          className: '_User',
          objectId: userID
      },

      ACL: {},
      kinds,
      batch,
      value
    };

    params.ACL[userID] = { read: true, write: true };
    params.ACL['*'] = { read: true };
    
    fetch(`${data.parseServerURL}/classes/Point/`, {
    method: 'POST',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
        'X-Parse-Session-Token': sessionToken
    },
    body: JSON.stringify(params)
    })
    .then((success) => {
    console.log(success);
    })
    .catch((err) => {
    console.log(err);// error handling ..
    });
  }

  render() {
    const { 
      container,
      freePointContainer,
      freePointTextStyle,
      freePointNumTextStyle,
      tableHead,
      tableHeadText,
      tableRow,
      tableRowText,
      skillRowStyle,
      skillTextStyle,
      iconStyle,
      skillValueStyle,
      btnAreaStyle
    } = styles;
    return (
      <View style={container}>

        {/* 自由點數 row */}
        <View style={freePointContainer}>
          <Text style={freePointTextStyle}>自由點數</Text>
          <Text style={freePointNumTextStyle}>{this.state.free_point}</Text>        
        </View>

        {/* 目前能力值table */}
        <Table 
          borderStyle={{ borderWidth: 2, borderColor: '#fff' }}
          style={{ flex: 2 }}
        >
            <Row 
              data={this.state.tableHead} 
              style={tableHead} 
              textStyle={tableHeadText} 
            />
            <Rows
                data={this.state.tableData}
                style={tableRow}
                textStyle={tableRowText}
            />
        </Table>

        {/* 信心 row */}
        <View style={skillRowStyle}>
         
          {/* 能力值文字 */}
          <Text style={skillTextStyle}>
            信心 
          </Text>

           {/* 減號 */}
          <TouchableOpacity
            onPress={() => {
              if (this.state.tmpFaith > 0) {
                this.setState((previousState) => {
                  return {
                    tmpFaith: previousState.tmpFaith - 1,
                    free_point: previousState.free_point + 1
                  };
                 });
              }
            }}
          >
              <Image
                style={iconStyle}
                source={Sub}
              />
          </TouchableOpacity>
            
          {/* 能力值數值 */}
          <View style={skillValueStyle}>
            <Text style={skillTextStyle}>
              {this.state.tmpFaith}
            </Text>
          </View>

           {/* 加號 */}
          <TouchableOpacity
            onPress={() => {
                if (this.state.free_point > 0) {
                  this.setState((previousState) => {
                    return {
                      tmpFaith: previousState.tmpFaith + 1,
                      free_point: previousState.free_point - 1
                    };
                   });
                }
              }}
          >
              <Image
                style={iconStyle}
                source={Add}
              />
          </TouchableOpacity>
        </View>

        {/* 敏捷 row */}
        <View style={skillRowStyle}>
            
          {/* 能力值文字 */}
          <Text style={skillTextStyle}>
            敏捷 
          </Text>

           {/* 減號 */}
          <TouchableOpacity
            onPress={() => {
              if (this.state.tmpAgility > 0) {
                this.setState((previousState) => {
                  return {
                    tmpAgility: previousState.tmpAgility - 1,
                    free_point: previousState.free_point + 1
                  };
                 });
              }
            }}
          >
              <Image
                style={iconStyle}
                source={Sub}
              />
          </TouchableOpacity>

          {/* 能力值數值 */}
          <View style={skillValueStyle}>
            <Text style={skillTextStyle}>
              {this.state.tmpAgility}
            </Text>
          </View>

           {/* 加號 */}
          <TouchableOpacity
            onPress={() => {
                if (this.state.free_point > 0) {
                  this.setState((previousState) => {
                    return {
                      tmpAgility: previousState.tmpAgility + 1,
                      free_point: previousState.free_point - 1
                    };
                   });
                }
              }}
          >
              <Image
                style={iconStyle}
                source={Add}
              />
          </TouchableOpacity>
        </View>

        {/* 力量 row */}
        <View style={skillRowStyle}>
         
          {/* 能力值文字 */}
          <Text style={skillTextStyle}>
            力量 
          </Text>

           {/* 減號 */}
          <TouchableOpacity
            onPress={() => {
              if (this.state.tmpStrength > 0) {
                this.setState((previousState) => {
                  return {
                    tmpStrength: previousState.tmpStrength - 1,
                    free_point: previousState.free_point + 1
                  };
                 });
              }
            }}
          >
              <Image
                style={iconStyle}
                source={Sub}
              />
          </TouchableOpacity>

          {/* 能力值數值 */}
          <View style={skillValueStyle}>
            <Text style={skillTextStyle}>
              {this.state.tmpStrength}
            </Text>
          </View>

           {/* 加號 */}
          <TouchableOpacity
            onPress={() => {
                if (this.state.free_point > 0) {
                  this.setState((previousState) => {
                    return {
                      tmpStrength: previousState.tmpStrength + 1,
                      free_point: previousState.free_point - 1
                    };
                   });
                }
              }}
          >
              <Image
                style={iconStyle}
                source={Add}
              />
          </TouchableOpacity>
        </View>

        {/* 智慧 row */}
        <View style={skillRowStyle}>
         
          {/* 能力值文字 */}
          <Text style={skillTextStyle}>
            智慧 
          </Text>

           {/* 減號 */}
          <TouchableOpacity
            onPress={() => {
              if (this.state.tmpWisdom > 0) {
                this.setState((previousState) => {
                  return {
                    tmpWisdom: previousState.tmpWisdom - 1,
                    free_point: previousState.free_point + 1
                  };
                 });
              }
            }}
          >
              <Image
                style={iconStyle}
                source={Sub}
              />
          </TouchableOpacity>

          {/* 能力值數值 */}
          <View style={skillValueStyle}>
            <Text style={skillTextStyle}>
              {this.state.tmpWisdom}
            </Text>
          </View>

           {/* 加號 */}
          <TouchableOpacity
            onPress={() => {
                if (this.state.free_point > 0) {
                  this.setState((previousState) => {
                    return {
                      tmpWisdom: previousState.tmpWisdom + 1,
                      free_point: previousState.free_point - 1
                    };
                   });
                }
              }}
          >
              <Image
                style={iconStyle}
                source={Add}
              />
          </TouchableOpacity>
        </View>

        {/* 體力 row */}
        <View style={skillRowStyle}>
         
          {/* 中間文字 */}
          <Text style={skillTextStyle}>
            體力
          </Text>
          
           {/* 減號 */}
          <TouchableOpacity
            onPress={() => {
              if (this.state.tmpVitality > 0) {
                this.setState((previousState) => {
                  return {
                    tmpVitality: previousState.tmpVitality - 1,
                    free_point: previousState.free_point + 1
                  };
                 });
              }
            }}
          >
              <Image
                style={iconStyle}
                source={Sub}
              />
          </TouchableOpacity>
            
          {/* 能力值數值 */}
          <View style={skillValueStyle}>
            <Text style={skillTextStyle}>
              {this.state.tmpVitality}
            </Text>
          </View>

           {/* 加號 */}
          <TouchableOpacity
            onPress={() => {
                if (this.state.free_point > 0) {
                  this.setState((previousState) => {
                    return {
                      tmpVitality: previousState.tmpVitality + 1,
                      free_point: previousState.free_point - 1
                    };
                   });
                }
              }}
          >
              <Image
                style={iconStyle}
                source={Add}
              />
          </TouchableOpacity>
        </View>
        <View style={btnAreaStyle}>
          <Button 
          btnCustomStyle={{ 
            backgroundColor: '#E63F00', 
            marginRight: width * 0.12, 
            borderColor: '#E63F00' }}
          >
            重置
          </Button>
          <Button 
            btnCustomStyle={{ 
              marginLeft: width * 0.12,
            }}
          >
            確定
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  freePointContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  freePointNumTextStyle: {
    fontWeight: 'bold', 
    fontSize: 25
  },
  freePointTextStyle: {
    fontWeight: 'bold', 
    fontSize: 22, 
    marginBottom: height * 0.01
  },
  tableHead: { 
    height: 40,
    backgroundColor: '#AAAAAA'
  },
  tableRowText: { 
    margin: 6,
    textAlign: 'center', 
    fontWeight: '400' 
  },
  tableHeadText: {
    fontSize: 16,
    margin: 6,
    textAlign: 'center', 
    fontWeight: '600',
    color: 'white'
  },
  tableRow: { 
    height: 40, 
    backgroundColor: '#BBC3DC' 
  },
  skillRowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  skillTextStyle: {
    fontSize: 20
  },
  skillValueStyle: {
    width: width * 0.15, 
    alignItems: 'center'
  },
  iconStyle: {
    width: 30, 
    height: 30
  },
  btnAreaStyle: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

const mapStateToProps = ({ player }) => {
  const {  
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業
    free_point, //自由點數

    //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience, //耐力

    //
    careerCode,
    showCodeModal,
    showErrorModal,
    errorText,
    loading
   } = player;

  return { 
    batch, //國高or大專
    camp, //陣營
    name, //第幾小隊
    team_total_score, //總分
    career, //職業
    free_point, //自由點數

    //國高能力值
    strength, //力量
    wisdom, //智慧
    vitality, //體力
    faith, //信心
    agility, //敏捷

    //大專能力值
    passion, //熱情
    creativity, //創意
    intelligence, //智慧
    love, //愛心
    patience, //耐力

    //
    careerCode,
    showCodeModal,
    showErrorModal,
    errorText,
    loading
  };
};

export default connect(mapStateToProps, {})(Skills);

