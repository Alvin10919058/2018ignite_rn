import React from 'react';
import { TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { ChevronRight } from '../../images';

const { height, width } = Dimensions.get('window');

const CardList = ({ cardText, onPress, listCustomStyle, listTextStyle, arrow }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[listCustomStyle, { 
        flexDirection: 'row',
         width: width * 1, 
         justifyContent: 'space-between' 
      }]} 
    >
        <Text style={[styles.cardText, listTextStyle]}>{cardText}</Text>
        {
          arrow
          &&
          <Image
            style={styles.iconStyle}
            source={ChevronRight}
          />
        }
    </TouchableOpacity>
  );
};

const styles = {
  cardText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16
  },
  iconStyle: { 
    width: 30, 
    height: 30,
    alignSelf: 'center'
  }
};

export { CardList };
