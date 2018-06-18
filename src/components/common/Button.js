import React from 'react';
import { Text, TouchableOpacity, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Button = ({ onPress, children, btnCustomStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, btnCustomStyle]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1,
    height: 45,
    width: 100,
    // alignSelf: 'stretch',
    backgroundColor: '#007aff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 }, // 左右不要有陰影
      },
      android: {
        elevation: 3,
        //top: height - 135
      }
    })
  }
};

export { Button };
