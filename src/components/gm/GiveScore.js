import React from 'react';
import { Alert, Text, StyleSheet, View, ScrollView, AsyncStorage } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Table, Row } from 'react-native-table-component';
import { Button, Spinner } from '../common';
import SwitchButton from '../common/SwitchButton';
import data from '../../Setting.json';


class GiveScore extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
    
    this.state = {
        activeSwitch: 1,
        selecTeam: undefined,

        TeamData: {},
        tableHead: ['梯次', '小隊', '種類', '點數'],
        tableData: [],
        widthArr: [80, 85, 120, 85],

        teams: [
            {
                label: 'Team01',
                value: '01',
            },
            {
                label: 'Team02',
                value: '02',
            },
            {
                label: 'Team03',
                value: '03',
            },
            {
                label: 'Team04',
                value: '04',
            },
            {
                label: 'Team05',
                value: '05',
            },
            {
                label: 'Team06',
                value: '06',
            },
            {
                label: 'Team07',
                value: '07',
            },
            {
                label: 'Team08',
                value: '08',
            },
            {
                label: 'Team09',
                value: '09',
            },
            {
                label: 'Team10',
                value: '10',
            },
            {
                label: 'Team11',
                value: '11',
            },
            {
                label: 'Team12',
                value: '12',
            },
            {
                label: 'Team13',
                value: '13',
            },
            {
                label: 'Team14',
                value: '14',
            },
            {
                label: 'Team15',
                value: '15',
            },
            {
                label: 'Team16',
                value: '16',
            },
            {
                label: 'Team17',
                value: '17',
            },
            {
                label: 'Team18',
                value: '18',
            },
            {
                label: 'Team19',
                value: '19',
            },
            {
                label: 'Team20',
                value: '20',
            },
            {
                label: 'Team21',
                value: '21',
            },
            {
                label: 'Team22',
                value: '22',
            },
            {
                label: 'Team23',
                value: '23',
            },
            {
                label: 'Team24',
                value: '24',
            }
        ],
        selecT1Kinds: '',
        T1kinds: [
            {
                label: '自由點數',
                value: 'free_point',
            },
            {
                label: '力量',
                value: 'strength',
            },
            {
                label: '信心',
                value: 'faith',
            },
            {
                label: '智慧',
                value: 'wisdom',
            },
            {
                label: '敏捷',
                value: 'agility',
            },
            {
                label: '體力',
                value: 'vitality',
            }
        ],
        selecT2Kinds: undefined,
        T2kinds: [
            {
                label: '自由點數',
                value: 'free_point',
            },
            {
                label: '智慧',
                value: 'intelligence',
            },
            {
                label: '創意',
                value: 'creativity',
            },
            {
                label: '耐力',
                value: 'patience',
            },
            {
                label: '愛心',
                value: 'love',
            },
            {
                label: '熱情',
                value: 'passion',
            }
        ],
        selecNumber: undefined,
        number: [
            {
                label: '5',
                value: '5',
            },
            {
                label: '10',
                value: '10',
            },
            {
                label: '15',
                value: '15',
            },
            {
                label: '20',
                value: '20',
            },
            {
                label: '25',
                value: '25',
            },
            {
                label: '30',
                value: '30',
            },
            {
                label: '35',
                value: '35',
            },
            {
                label: '40',
                value: '40',
            },
            {
                label: '45',
                value: '45',
            },
            {
                label: '50',
                value: '50',
            },
            {
                label: '55',
                value: '55',
            },
            {
                label: '60',
                value: '60',
            },
            {
                label: '-5',
                value: '-5',
            },
            {
                label: '-10',
                value: '-10',
            },
            {
                label: '-15',
                value: '-15',
            },
            {
                label: '-20',
                value: '-20',
            },
            {
                label: '-25',
                value: '-25',
            },
            {
                label: '-30',
                value: '-30',
            },
            {
                label: '-35',
                value: '-35',
            },
            {
                label: '-40',
                value: '-40',
            },
            {
                label: '-45',
                value: '-45',
            },
            {
                label: '-50',
                value: '-50',
            },
            {
                label: '-55',
                value: '-55',
            },
            {
                label: '-60',
                value: '-60',
            }
        ]
    };
}

componentDidMount() {
  this.getGMdata();
    // if the component is using the optional `value` prop, the parent
    // has the abililty to both set the initial value and also update it
    // setTimeout(() => {
    //     this.setState({
    //         favColor: 'red',
    //     });
    // }, 1000);

    // // parent can also update the `items` prop
    // setTimeout(() => {
    //     this.setState({
    //         items: this.state.items.concat([{ value: 'purple', label: 'Purple' }]),
    //     });
    // }, 2000);
}

  //GET這個GM寫了幾筆資料
  async getGMdata() {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    const userID = await AsyncStorage.getItem('userID');

    const params = {
      include: 'to_team',
      limit: 1000,
      where: {
          from_gm: {
              __type: 'Pointer',
              className: '_User',
              objectId: userID
          },
      }
    };
    const esc = encodeURIComponent;
    const query = Object.keys(params)
        .map(k => `${esc(k)}=${esc(JSON.stringify(params[k]))}`)
        .join('&');
    fetch(`${data.parseServerURL}/classes/Point?${query}`, {
    method: 'GET',
    headers: {
        'X-Parse-Application-Id': data.parseAppId,
        'X-Parse-REST-API-Key': data.paresApiKey,
        'X-Parse-Session-Token': sessionToken
    }
    })
    .then((response) => response.json())
    .then(async (responseData) => {
         //將取得的物件資料複製一份到obj
         const CopyRes = [...responseData.results];
        
         //將此物件依據小隊總分由大到小(b-a)的順序來排序
         CopyRes.sort((a, b) => b.updatedAt - a.updatedAt);
        
         this.setState({ PointData: CopyRes });

         //選出要的資料放入tableData中
           const finalDataAry = [];
          
           CopyRes.map((PointData) => {
             finalDataAry.push([PointData.batch, PointData.to_team.name, PointData.kinds, PointData.value]);
            console.log(finalDataAry);
             return true;
           });
     this.setState({ tableData: finalDataAry });
    })
    .catch((error) => {
        console.log(error);
    });
  }

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
    return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
            <SwitchButton
                    onValueChange={(val) => this.setState({ activeSwitch: val })}     
                    text1='國高'                      
                    text2='大專'                      
                    switchWidth={200}                  
                    switchHeight={44}              
                    switchdirection='ltr'            
                    switchBorderRadius={100}       
                    switchSpeedChange={500}           
                    switchBorderColor='#d4d4d4'       
                    switchBackgroundColor='#fff'   
                    btnBorderColor='#00a4b9'          
                    btnBackgroundColor='#69aeb2'     
                    fontColor='#b1b1b1'             
                    activeFontColor='#fff'
            />
            <View style={{ paddingVertical: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 5 }}>小隊</Text>
            <RNPickerSelect
                placeholder={{
                    label: '請選擇小隊',
                    value: null,
                }}
                items={this.state.teams}
                onValueChange={(value) => {
                    this.setState({
                      selecTeam: value,
                    });
                }}
                onDownArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.selecTeam}
                ref={(el) => {
                    this.inputRefs.picker = el;
                }}
            />
                {console.log()}
            <View style={{ paddingVertical: 5 }} />

            <Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 5 }}>種類</Text>
            <RNPickerSelect
                placeholder={{
                    label: '請選擇配點種類',
                    value: null,
                }}
                items={this.state.T1kinds}
                onValueChange={(value) => {
                    this.setState({
                      selecT1Kinds: value,
                    });
                }}
                onUpArrow={() => {
                    this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                    this.inputRefs.picker3.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.selecT1Kinds}
                ref={(el) => {
                    this.inputRefs.picker2 = el;
                }}
            />

            <View style={{ paddingVertical: 5 }} />

            <Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 5 }}>點數</Text>
            <RNPickerSelect
                placeholder={{
                    label: '請選擇給予點數',
                    value: null,
                }}
                items={this.state.number}
                onValueChange={(value) => {
                    this.setState({
                      selecNumber: value,
                    });
                }}
                onUpArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                
                style={{ ...pickerSelectStyles }}
                value={this.state.selecNumber}
                ref={(el) => {
                    this.inputRefs.picker3 = el;
                }}
            />

            <View style={{ paddingVertical: 5 }} />
            <Button onPress={() => { console.log(this.state.activeSwitch, this.state.selecTeam, this.state.selecT1Kinds, this.state.selecNumber); }} >
              送出
            </Button>
        </View>
        <View style={{ paddingVertical: 5 }} />
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#f0f0f0' }}>
            <Row 
              data={this.state.tableHead} 
              widthArr={this.state.widthArr} 
              style={styles.head} 
              textStyle={styles.headText} 
            />
          </Table>
        
          <ScrollView style={styles.dataWrapper}>
            <Table 
              borderStyle={{ borderWidth: 2, borderColor: '#f0f0f0' }}
            >
              {
                this.state.tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={this.state.widthArr}
                    style={[styles.row, index % 2 && { backgroundColor: '#bbc3dc' }]}
                    textStyle={styles.text}
                  />
                ))
              }
            </Table>
          </ScrollView>
        </View>
    </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
  },
 
  head: { 
    height: 40,
    backgroundColor: '#555555'
  },
  text: { 
    margin: 6,
    textAlign: 'center', 
    fontWeight: '400' 
  },
  headText: {
    fontSize: 16,
    margin: 6,
    textAlign: 'center', 
    fontWeight: '600',
    color: 'white'
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#d2e9ff' 
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
  },
});

export default GiveScore;


// import React, { Component } from 'react';
// import { View } from 'react-native';

// class GiveScore extends Component {
//   render() {
//     return (
//       <View style={styles.containerStyle} />
//     );
//   }
// }

// const styles = {
//   containerStyle: {
//     flex: 1,
//     backgroundColor: 'white'
//   }
// };

// export default GiveScore;
