import React, { Component } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ArrowLeft } from '../../images';

const { width } = Dimensions.get('window');

class GeneralPage extends Component {

  render() {
    const {
      containerStyle,
      headerContainer,
      headerStyle,
      textContainer,
      backStyle,
      contentContainer,
      iconStyle
    } = styles;

    const {
      children,
      header,
      onPress
    } = this.props;

    return (
      <View style={containerStyle}>
        <View style={headerContainer}>
          <TouchableOpacity onPress={onPress} style={backStyle}>
            <Image
                style={iconStyle}
                source={ArrowLeft}
            />
          </TouchableOpacity>
          <View style={textContainer}>
            <Text style={headerStyle}>{header}</Text>
          </View>
          <View style={{ width: 50 }} />
          
        </View>
        <View style={contentContainer}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  iconStyle: { 
    width: 20, 
    height: 20,
    alignSelf: 'center'
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#bbb'
  },
  backStyle: {
    width: 50,
    justifyContent: 'center',
    paddingLeft: 5,
    alignItems: 'center'
  },
  textContainer: {
    width: width - 100,
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 10,
    backgroundColor: '#FBFBFB'
  },
  headerStyle: {
    color: '#333',
    fontSize: 16,
    alignSelf: 'center'
  }
};

export { GeneralPage };
