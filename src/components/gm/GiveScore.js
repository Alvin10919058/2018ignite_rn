import React from 'react';
import { Text, StyleSheet, View, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Table, Row } from 'react-native-table-component';
import { Button } from '../common';
import SwitchButton from '../common/SwitchButton';
import data from '../../Setting.json';
import PickerData from '../../pickerData.json';

const { height, width } = Dimensions.get('window');

class GiveScore extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      activeSwitch: 1,
      selectBatch: '國高',
      //history table setting data
      TeamData: {},
      tableHead: ['梯次', '小隊', '種類', '點數'],
      tableData: [],
      widthArr: [width * 0.205, width * 0.215, width * 0.32, width * 0.215],
      //Picker setting data
      selectTeam: '',
      teams: PickerData.teamSelection,
      selecKinds: '',
      kinds: PickerData.T1teamSelection,
      selecT1Kinds: '',
      T1kinds: PickerData.T1teamSelection,
      selecT2Kinds: '',
      T2kinds: PickerData.T2teamSelection,
      selectNumber: undefined,
      number: PickerData.numberSelection
    };
  }
 

componentDidMount() {
  this.getGMdata();
}

  //GET這個GM寫了幾筆資料
  async getGMdata() {
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    const userID = await AsyncStorage.getItem('userID');

    const params = {
      //將此物件依據更新時間由近到遠的順序來排序
      order: '-updatedAt',
      //將to_team pointer 指向的資料也include進來
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
        
         this.setState({ PointData: CopyRes });

         //選出要的資料放入tableData中
           const finalDataAry = [];
          
           CopyRes.map((PointData) => {
             finalDataAry.push([PointData.batch, PointData.to_team.name, PointData.kinds, PointData.value]);
             return true;
           });
     this.setState({ tableData: finalDataAry });
    })
    .catch((error) => {
        console.log(error);
    });
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
    return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
            <SwitchButton
                    onValueChange={(val) => {
                      const T1tmp = this.state.selecT1Kinds;
                      const T2tmp = this.state.selecT2Kinds;
                      if (val === 1) {
                        this.setState({ 
                          activeSwitch: val, 
                          selectBatch: '國高',
                          selecKinds: T1tmp,
                          // kinds: PickerData.T1teamSelection
                        });
                      } else {
                        this.setState({ 
                          activeSwitch: val, 
                          selectBatch: '大專',
                          selecKinds: T2tmp,
                          // kinds: PickerData.T2teamSelection
                        });
                      }
                    }}     
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
                      selectTeam: value,
                    });
                }}
                onDownArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.selectTeam}
                ref={(el) => {
                    this.inputRefs.picker = el;
                }}
            />
            <View style={{ paddingVertical: 5 }} />
              
            <Text style={{ fontSize: 20, fontWeight: '400', marginBottom: 5 }}>種類</Text>
          
            {
              this.state.activeSwitch === 1
              &&
              <RNPickerSelect
                  placeholder={{
                      label: '請選擇配點種類',
                      value: null,
                  }}
                  
                  items={this.state.T1kinds}
                  value={this.state.selecT1Kinds}
                  onValueChange={(value) => {
                      this.setState({
                        selecT1Kinds: value,
                        selecKinds: value
                      });
                  }}

                  onUpArrow={() => {
                      this.inputRefs.picker.togglePicker();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker3.togglePicker();
                  }}
                  style={{ ...pickerSelectStyles }}
                  ref={(el) => {
                      this.inputRefs.picker2 = el;
                  }}
              />
            }
            {
              this.state.activeSwitch === 2
              &&
              <RNPickerSelect
                  placeholder={{
                      label: '請選擇配點種類',
                      value: null,
                  }}
                  
                  items={this.state.T2kinds}
                  value={this.state.selecT2Kinds}
                  onValueChange={(value) => {
                      this.setState({
                        selecT2Kinds: value,
                        selecKinds: value
                      });
                  }}

                  onUpArrow={() => {
                      this.inputRefs.picker.togglePicker();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker3.togglePicker();
                  }}
                  style={{ ...pickerSelectStyles }}
                  ref={(el) => {
                      this.inputRefs.picker2 = el;
                  }}
              />
            }
            {console.log(this.state.selecKinds)}
         

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
                      selectNumber: value,
                    });
                }}
                onUpArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                
                style={{ ...pickerSelectStyles }}
                value={this.state.selectNumber}
                ref={(el) => {
                    this.inputRefs.picker3 = el;
                }}
            />

            <View style={{ paddingVertical: 5 }} />
            <Button 
              //  btnCustomStyle={{ 
              //     backgroundColor: '#69aeb2',
              //     borderColor: '#69aeb2' 
              //   }}
              onPress={() => {
                console.log(this.state.selectBatch, this.state.selectTeam, this.state.selectNumber, this.state.selecKinds);
                this.getTeam(this.state.selectBatch, this.state.selectTeam, this.state.selectNumber, this.state.selecKinds);
              }} 
            >
              送出
            </Button>
        </View>
        <View style={{ paddingVertical: 5 }} />
        <View style={{ marginLeft: width * 0.02, marginRight: width * 0.02 }}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#ffffff' }}>
            <Row 
              data={this.state.tableHead} 
              widthArr={this.state.widthArr} 
              style={styles.head} 
              textStyle={styles.headText} 
            />
          </Table>
        
          <ScrollView style={styles.dataWrapper}>
            <Table 
              borderStyle={{ borderWidth: 2, borderColor: '#ffffff' }}
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

