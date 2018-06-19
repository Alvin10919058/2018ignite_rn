import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const CardList = ({ cardText, onPress, listCustomStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={listCustomStyle} >
        <Text style={styles.cardText}>{cardText}</Text>
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
