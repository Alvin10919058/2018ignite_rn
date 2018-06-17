import React from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button, Spinner } from '../common';
import SwitchButton from '../common/SwitchButton';

class GiveScore extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
    
    this.state = {
        activeSwitch: 1,
        selecTeam: undefined,
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

render() {
    return (
     
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
                    btnBackgroundColor='#00bcd4'     
                    fontColor='#b1b1b1'             
                    activeFontColor='#fff'
            />
            <Text>小隊</Text>
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

            <Text>種類</Text>
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

            <Text>點數</Text>
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
