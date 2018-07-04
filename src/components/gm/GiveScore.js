import React from 'react';
import { Text, StyleSheet, View, ScrollView, AsyncStorage, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Table, Row } from 'react-native-table-component';
import { Button, InputModal, Spinner } from '../common';
import SwitchButton from '../common/SwitchButton';
import data from '../../Setting.json';
import PickerData from '../../pickerData.json';

const { height, width } = Dimensions.get('window');

class GiveScore extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      showSureModal: false,
      InputModalSureText: '',
      showAlertModal: false,
      InputModalAlertText: '',

      activeSwitch: 1,
      selectBatch: '國高',
      //history table setting data
      TeamData: {},
      tableHead: ['梯次', '關卡', '小隊', '種類', '點數'],
      tableData: [],
      widthArr: [width * 0.160, width * 0.200, width * 0.150, width * 0.27, width * 0.170],
      //Picker setting data
      selectStage: '',
      stage: PickerData.stageSelection,
      selectTeam: '',
      teams: PickerData.teamSelection,
      selectKinds: '',
      kinds: PickerData.T2teamSelection,
      selectNumber: 0,
      number: PickerData.numberSelection,
      loading: false
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
             finalDataAry.push([PointData.batch, PointData.stage, PointData.to_team.name, PointData.kinds, PointData.value]);
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
  getTeam(batch, teamName, value, kinds, stage) {
    const params = {
        include: 'career',
        //limit: 1000,
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
          responseData.results[0][kinds],
          stage,
          responseData.results[0].career.name,
          responseData.results[0].team_total_score
        );
    })
    .catch((error) => {
        console.log(error);
        this.setState({ 
          InputModalAlertText: '資料傳送失敗！\n請再試一次！',
          showAlertModal: true,
        });
    });
  }

  //value: 要給幾點, kinds: 哪種類別, originalValue: 原來類別的分數
  putTeam(teamID, batch, value, kinds, originalValue, stage, career, score) {
    let addScore = 0;

    if (batch === '國高') {
      if (career === '戰士') {
        addScore = value;
      } else if (career === '特勤部隊') {
        if (kinds === 'strength') {
          addScore = value * 2;
        } else if (kinds === 'agility') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '急襲部隊') {
        if (kinds === 'agility') {
          addScore = value * 2;
        } else if (kinds === 'strength') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '狙擊部隊') {
        if (kinds === 'faith') {
          addScore = value * 2;
        } else if (kinds === 'vitality') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '防禦部隊') {
        if (kinds === 'vitality') {
          addScore = value * 2;
        } else if (kinds === 'wisdom') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '生化小組') {
        if (kinds === 'wisdom') {
          addScore = value * 2;
        } else if (kinds === 'faith') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } 
    } else if (batch === '大專') {
      if (career === '戰士') {
        addScore = value;
      } else if (career === '特勤部隊') {
        if (kinds === 'passion') {
          addScore = value * 2;
        } else if (kinds === 'creativity') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '急襲部隊') {
        if (kinds === 'creativity') {
          addScore = value * 2;
        } else if (kinds === 'passion') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '狙擊部隊') {
        if (kinds === 'intelligence') {
          addScore = value * 2;
        } else if (kinds === 'patience') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '防禦部隊') {
        if (kinds === 'patience') {
          addScore = value * 2;
        } else if (kinds === 'love') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } else if (career === '生化小組') {
        if (kinds === 'love') {
          addScore = value * 2;
        } else if (kinds === 'intelligence') {
          addScore = value * 1.5;
        } else {
          addScore = value;
        }
      } 
    }

    const params = {
      team_total_score: score + addScore
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
        this.postPoint(teamID, batch, value, kinds, stage);
    })
    .catch((err) => {
        console.log(err);// error handling ..
        this.setState({ 
          InputModalAlertText: '資料傳送失敗！\n請再試一次！',
          showAlertModal: true,
        });
    });
  }

  //value: 要給幾點, kinds: 哪種類別
  async postPoint(teamID, batch, value, kinds, stage) {
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
      value,
      stage
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
     this.setState({ loading: false });
     this.getGMdata();
    })
    .catch((err) => {
        console.log(err);// error handling ..
        this.setState({ 
          InputModalAlertText: '資料傳送失敗！\n請再試一次！',
          showAlertModal: true,
        });
    });
  }

renderButton() {
  if (this.state.loading) {
    return (
      null
    );
  } 
  return (
    <Button 
    btnCustomStyle={{ 
       backgroundColor: '#69aeb2',
       borderColor: '#69aeb2',
       marginTop: height * 0.031,
       marginBottom: height * 0.027
     }}
   onPress={() => {
     if (
        this.state.selectBatch && 
        this.state.selectTeam && 
        this.state.selectNumber && 
        this.state.selectKinds && 1 !== null) {
        const textTmp = '請檢查資料是否正確:\n\n梯次：'
          + this.state.selectBatch + '\n關卡：' 
          + this.state.selectStage + '\n小隊:'
          + this.state.selectTeam + '\n種類:'
          + this.state.selectKinds + '\n點數:' 
          + this.state.selectNumber + '\n';
          this.setState({ 
            InputModalSureText: textTmp,
            showSureModal: true,
          });
        } else {
          console.log('here');
          this.setState({ 
            InputModalAlertText: '您還有未輸入的欄位哦！',
            showAlertModal: true,
          });
        }
        console.log(
          this.state.selectBatch, 
          this.state.selectStage, 
          this.state.selectTeam, 
          this.state.selectNumber, 
          this.state.selectKinds
        );
      }}
    >
      送出
   </Button>
  );
}

renderHistory() {
  const { head, row, headText, text, dataWrapper, tableContainer } = styles;
  if (this.state.loading) {
    return (
      <Spinner />
    );
  } 
  return (
    <View style={tableContainer}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#ffffff' }}>
        <Row 
          data={this.state.tableHead} 
          widthArr={this.state.widthArr} 
          style={head} 
          textStyle={headText} 
        />
      </Table>
    
      <ScrollView style={dataWrapper}>
        <Table 
          borderStyle={{ borderWidth: 2, borderColor: '#ffffff' }}
        >
          {
            this.state.tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={this.state.widthArr}
                style={[row, index % 2 && { backgroundColor: '#bbc3dc' }]}
                textStyle={text}
              />
            ))
          }
        </Table>
      </ScrollView>
    </View>
  );
}

render() {
    return (
     <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <InputModal  
          titleText={this.state.InputModalSureText}
          textCustomStyle={{ textAlign: 'left', paddingLeft: width * 0.25 }}
          visible={this.state.showSureModal}
          scrollable
          cancelButton
          cancel={() => { this.setState({ showSureModal: false }); }}
          onPress={() => { 
            this.setState({ showSureModal: false, loading: true });
            this.getTeam(
              this.state.selectBatch, 
              this.state.selectTeam, 
              this.state.selectNumber, 
              this.state.selectKinds,
              this.state.selectStage);
          }} 
        />
        <InputModal  
          titleText={this.state.InputModalAlertText}
          scrollable={false}
          visible={this.state.showAlertModal}
          onPress={() => { this.setState({ showAlertModal: false }); }}
        />
        <View style={styles.container}>
          <SwitchButton
            onValueChange={(val) => {
              if (val === 1) {
                this.setState({ 
                  activeSwitch: val, 
                  selectBatch: '國高',
                  selectStage: '',
                  stage: PickerData.stageSelection,
                  selectTeam: '',
                  teams: PickerData.teamSelection,
                  selectKinds: '',
                  kinds: PickerData.T2teamSelection,
                  selectNumber: 0,
                  number: PickerData.numberSelection
                });
              } else {
                this.setState({ 
                  activeSwitch: val, 
                  selectBatch: '大專',
                  selectStage: '',
                  stage: PickerData.stageSelection,
                  selectTeam: '',
                  teams: PickerData.teamSelection,
                  selectKinds: '',
                  kinds: PickerData.T1teamSelection,
                  selectNumber: 0,
                  number: PickerData.numberSelection
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

          <View style={styles.pickerRowStyle}>
            <Text style={styles.labelStyle}>關卡</Text>
            {
              this.state.activeSwitch === 1
              &&
              <RNPickerSelect
                placeholder={{
                    label: '請選擇關卡',
                    value: null,
                }}
                items={this.state.stage}
                onValueChange={(value) => {
                    this.setState({
                      selectStage: value,
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
            }
            {
              this.state.activeSwitch === 2
              &&
              <RNPickerSelect
                  placeholder={{
                      label: '請選擇關卡',
                      value: null,
                  }}
                  items={this.state.stage}
                  onValueChange={(value) => {
                      this.setState({
                        selectStage: value,
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
            }
          </View>

          <View style={styles.pickerRowStyle}>
            <Text style={styles.labelStyle}>小隊</Text>
            {
              this.state.activeSwitch === 1
              &&
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
                onUpArrow={() => {
                  this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                    this.inputRefs.picker3.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.selectTeam}
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
                    label: '請選擇小隊',
                    value: null,
                }}
                items={this.state.teams}
                onValueChange={(value) => {
                    this.setState({
                      selectTeam: value,
                    });
                }}
                onUpArrow={() => {
                  this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                    this.inputRefs.picker3.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.selectTeam}
                ref={(el) => {
                    this.inputRefs.picker2 = el;
                }}
              />
            }
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              width: width * 0.95,
              marginTop: height * 0.025
            }}
          >
            <View style={styles.row3col}>
              <Text style={styles.labelStyle}>種類</Text>
              {
                this.state.activeSwitch === 1
                &&
                <RNPickerSelect
                    placeholder={{
                        label: '請選擇配點種類',
                        value: null,
                    }}
                    
                    items={this.state.kinds}
                    value={this.state.selectKinds}
                    onValueChange={(value) => {
                        this.setState({
                          selectKinds: value
                        });
                    }}

                    onUpArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker4.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    ref={(el) => {
                        this.inputRefs.picker3 = el;
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
                    
                    items={this.state.kinds}
                    value={this.state.selectKinds}
                    onValueChange={(value) => {
                        this.setState({
                          selectKinds: value
                        });
                    }}

                    onUpArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    onDownArrow={() => {
                        this.inputRefs.picker4.togglePicker();
                    }}
                    style={{ ...pickerSelectStyles }}
                    ref={(el) => {
                        this.inputRefs.picker3 = el;
                    }}
                />
              }
            </View>

            <View style={styles.row3col}>
              <Text style={styles.labelStyle}>點數</Text>
              {
                this.state.activeSwitch === 1
                &&
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
                      this.inputRefs.picker3.togglePicker();
                  }}
                  
                  style={{ ...pickerSelectStyles }}
                  value={this.state.selectNumber}
                  ref={(el) => {
                      this.inputRefs.picker4 = el;
                  }}
                />
              }
              {
                this.state.activeSwitch === 2
                &&
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
                      this.inputRefs.picker3.togglePicker();
                  }}
                  
                  style={{ ...pickerSelectStyles }}
                  value={this.state.selectNumber}
                  ref={(el) => {
                      this.inputRefs.picker4 = el;
                  }}
                />
              }           
            </View>
          </View> 
          {this.renderButton()}
        </View>
        {this.renderHistory()}
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
    backgroundColor: '#AAAAAA'
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
  tableContainer: {
    marginLeft: width * 0.02, 
    marginRight: width * 0.02, 
    flex: 1
  },
  row: { 
    height: 40, 
    backgroundColor: '#d2e9ff' 
  },
  labelStyle: {
    fontSize: 18, 
    fontWeight: '400', 
    marginBottom: height * 0.01
  },
  pickerRowStyle: {
    width: width * 0.95,
    alignItems: 'center',
    marginTop: height * 0.025
  },
  row3col: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width * 0.46
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 14,
      paddingTop: 10,
      paddingHorizontal: 15,
      paddingBottom: 9,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      backgroundColor: 'white',
      color: 'black',
  }
});

export default GiveScore;

