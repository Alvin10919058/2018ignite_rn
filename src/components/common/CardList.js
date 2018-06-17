import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const CardList = ({ cardText, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
        <Text style={styles.cardText}>{cardText}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  cardText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15
  }
};

export { CardList };
