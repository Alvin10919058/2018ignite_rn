import React from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SwitchButton from '../common/SwitchButton';

class GiveScore extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
        activeSwitch: 1,
        favColor: undefined,
        items: [
            {
                label: 'Red',
                value: 'red',
            },
            {
                label: 'Orange',
                value: 'orange',
            },
            {
                label: 'Blue',
                value: 'blue',
            },
        ],
        favSport: undefined,
        items2: [
            {
                label: 'Football',
                value: 'football',
            },
            {
                label: 'Baseball',
                value: 'baseball',
            },
            {
                label: 'Hockey',
                value: 'hockey',
            },
        ],
        favthing: undefined,
        items3: [
            {
                label: 'Football',
                value: 'football',
            },
            {
                label: 'Baseball',
                value: 'baseball',
            },
            {
                label: 'Hockey',
                value: 'hockey',
            },
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
                items={this.state.items}
                onValueChange={(value) => {
                    this.setState({
                        favColor: value,
                    });
                }}
                onDownArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.favColor}
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
                items={this.state.items2}
                onValueChange={(value) => {
                    this.setState({
                      favSport: value,
                    });
                }}
                onUpArrow={() => {
                    this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                    this.inputRefs.picker3.togglePicker();
                }}
                style={{ ...pickerSelectStyles }}
                value={this.state.favSport}
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
                items={this.state.items3}
                onValueChange={(value) => {
                    this.setState({
                      favthing: value,
                    });
                }}
                onUpArrow={() => {
                    this.inputRefs.picker2.togglePicker();
                }}
                
                style={{ ...pickerSelectStyles }}
                value={this.state.favthing}
                ref={(el) => {
                    this.inputRefs.picker2 = el;
                }}
            />

            <View style={{ paddingVertical: 5 }} />

              {/* <Text>Company?</Text>
              <TextInput
                  ref={(el) => {
                      this.inputRefs.company = el;
                  }}
                  returnKeyType="go"
                  enablesReturnKeyAutomatically
                  style={pickerSelectStyles.inputIOS}
                  onSubmitEditing={() => {
                      Alert.alert('Success', 'Form submitted', [{ text: 'Okay', onPress: null }]);
                  }}
              /> */}
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 10,
  },
  switchButton: {
    alignSelf: 'center',
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  },
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
