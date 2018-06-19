import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry,
  placeholderTextColor,
  underlineColorAndroid
}) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {/* <Text style={labelStyle}>{label}</Text> */}
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid={underlineColorAndroid}
        autoCapitalize={'none'}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#212159',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
