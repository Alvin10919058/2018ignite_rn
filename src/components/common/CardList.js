import React from 'react';
import { TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { ChevronRight } from '../../images';

const { width } = Dimensions.get('window');

const CardList = ({ cardText, onPress, listCustomStyle, listTextStyle, arrow }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[listCustomStyle, { flexDirection: 'row', width: width * 1, justifyContent: 'space-between' }]} >
        <Text style={[styles.cardText, listTextStyle]}>{cardText}</Text>
        {
        arrow
        &&
        <Image
            style={{ 
              width: 15, 
              height: 15,
              alignSelf: 'center',
            }}
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
  }
};

export { CardList };
