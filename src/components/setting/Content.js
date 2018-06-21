import React, { Component } from 'react';
import { ScrollView, Image, Text, Dimensions } from 'react-native';
import { Logo, imgTitle } from '../../images';

const { width } = Dimensions.get('window');

class Content extends Component {
  render() {
    const { scrollBox, contentStyle } = styles;
    return (
        <ScrollView style={scrollBox}>
          {
            this.props.isTitleImg
            &&
            <Image
                style={{ 
                  height: width * 0.22,
                  width: width * 0.9,
                  alignSelf: 'center',
                  alignItems: 'center',
                  resizeMode: Image.resizeMode.contain
                }}
                source={imgTitle}
            />
          }
          <Text style={contentStyle}>
            {this.props.content}
          </Text>
          <Image
            style={{
              alignSelf: 'flex-end',
              width: 35,
              height: 35,
              marginTop: 30,
              marginBottom: 50,
              resizeMode: Image.resizeMode.contain
            }}
            source={Logo}
          />
        </ScrollView>
    );
  }
}

const styles = {

contentStyle: {
    fontSize: 13,
    lineHeight: 30,
    textAlign: 'left',
    color: '#333'
  },

scrollBox: {
  flex: 1,
  paddingLeft: 25,
  paddingRight: 25,
  paddingTop: 25,
  backgroundColor: '#ffffff'
}


};

export default Content;
