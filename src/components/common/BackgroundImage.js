import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Background } from '../../images';

class BackgroundImage extends Component {

  render() {
    const { backgroundImage } = styles;
    const { style } = this.props;
    return (
      <ImageBackground source={Background} style={[backgroundImage, style]}>
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
