import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Background } from '../../images';

class BackgroundImage extends Component {

  render() {
    const { backgroundImage } = styles;
    return (
      <ImageBackground source={Background} style={backgroundImage}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = {
  backgroundImage: {
     flex: 1,
     width: null,
     height: null
   }
};

export { BackgroundImage };
