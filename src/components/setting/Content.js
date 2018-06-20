import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';
import { marker } from '../../images';

class Content extends Component {
  render() {
    const { scrollBox, contentStyle } = styles;
    return (
        <ScrollView style={scrollBox}>
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
            source={marker}
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
  paddingTop: 25
}


};

export default Content;
