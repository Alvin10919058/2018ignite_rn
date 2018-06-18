import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';
import { defaultPicUsercenter } from '../../images';


class MissionDeatail extends Component {

  renderTypeText(addType) {
    const {
      addContainer,
      addStyle,
      invitedStyle
    } = styles;

      if (addType) {
        return (
          <View style={addContainer}>
            <Text
              style={addStyle}
              onPress={() => { this.props.onPressInvite(); }}
            >
              未通過
            </Text>
          </View>
        );
      } else if (addType === false) {
        return (
          <View style={addContainer}>
            <Text style={invitedStyle}>
              已過關
            </Text>
          </View>
        );
     }
  }

  render() {
    const {
      container,
      infoDiv,
      imageDiv,
      nameDiv,
      textContainer,
      textStyle,
    } = styles;

    const { missionName, image, onPress, customStyle, addType,
    } = this.props;

    return (
      <View style={[container, customStyle]}>
        <TouchableOpacity onPress={onPress} style={infoDiv}>
          <View style={imageDiv}>
            <Image
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                resizeMode: Image.resizeMode.contain
              }}
              defaultSource={defaultPicUsercenter}
              source={image}
            />
          </View>
          <View style={nameDiv}>
            <View style={textContainer}>
              <Text style={textStyle} numberOfLines={1}>
                  {missionName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {this.renderTypeText(addType)}
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  infoDiv: {
    flex: 7,
    flexDirection: 'row'
  },
  imageDiv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10
  },
  nameDiv:{
    justifyContent: 'center',
    flex: 3,
    marginLeft: 5
  },
  textContainer: {
    flexDirection: 'column'
  },
  textStyle: {
    alignSelf: 'flex-start',
    color: '#222',
    fontSize: 18,
    fontWeight: '500'
  },
  invitedStyle: {
    color: '#bbb',
    fontSize: 12
  },
  addContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10
  },
  addStyle: {
    color: '#ED2A67',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
};

export { MissionDeatail };
