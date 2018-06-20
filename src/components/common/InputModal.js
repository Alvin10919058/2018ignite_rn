/*
使用教學

<InputModal
  titleText={標題文字}
  textCustomStyle={客製化的textStyle}
  scrollable={文字是否捲動}
  visible={顯示modal與否}
  onPress={按下確定按鈕後觸發的function}
  cancelButton={是否要顯示cancel按鈕}
  cancel={按下取消後觸發的function}
  inputText={是否要顯示textInput欄位}
  value={儲存文字的變數}
  onChangeText={當文字改變的function}
/>
*/

import React from 'react';
import { 
  Text, 
  TextInput, 
  ScrollView,
  View, 
  Modal,
  Dimensions, 
  TouchableOpacity, 
  Platform 
} from 'react-native';

const { width } = Dimensions.get('window');

const InputModal = ({
   titleText,
   inputText,
   value, 
   onChangeText, 
   visible, 
   onPress, 
   cancel, 
   cancelButton,
   textCustomStyle,
   scrollable
  }) => {
  const {
    containerStyle,
    textStyle,
    checkArea,
    sureTextStyle,
    cancelTextStyle,
    cardSectionStyle,
    inputStyle,
    inputContainerStyle
  } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={cardSectionStyle}>
          <View style={{ flex: 5 }}>
            {
              scrollable === true
              &&
              <ScrollView style={{ flex: 1 }}>
                <Text style={[textStyle, textCustomStyle]}>
                  {titleText}
                </Text>     
              </ScrollView>
            }
            { 
              scrollable === false
              &&
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={[textStyle, textCustomStyle]}>
                  {titleText}
                </Text>  
              </View>
            }
            
            {
              inputText
              &&
              <View style={{ flex: 3, justifyContent: 'center' }}>
                <View style={inputContainerStyle}>
                  <TextInput
                    placeholder={'請輸入你所得到的序號'}
                    placeholderTextColor={'#ccc'}
                    autoCorrect={false}
                    style={inputStyle}
                    value={value}
                    autoCapitalize='none'
                    onChangeText={onChangeText}
                    returnKeyType={'done'}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
              </View>
            }
          </View>
          {
              !cancelButton
              &&
              <View
              style={{ 
                borderBottomWidth: 1.5, 
                borderBottomColor: '#DDDDDD',
                }}
              />
            }
          <TouchableOpacity style={checkArea} onPress={onPress}>
            {
              cancelButton
              &&
              <Text style={cancelTextStyle} onPress={cancel}>取消</Text>
            }
            <Text style={sureTextStyle} onPress={onPress}>確定</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: width / 15,
    paddingRight: width / 15
  },
  cardSectionStyle: {
    padding: 5,
    backgroundColor: '#fdfdfd',
    position: 'relative',
    borderColor: '#fff',
    borderRadius: 15,
    height: 220,
    width: width * 0.9
  },
  textStyle: {
    padding: 15,
    fontSize: 16,
    textAlign: 'center'
  },
  checkArea: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sureTextStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelTextStyle: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF0000',
  },
  inputStyle: {
    flex: 1,
    color: '#333',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    ...Platform.select({
      ios: {
        fontFamily: 'PingFang TC'
      },
      android: {
        fontFamily: 'sans-serif',
        paddingBottom: 7
      }
    })    
  },
  inputContainerStyle: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 3,
    marginBottom: 5
  }
};

export { InputModal };
