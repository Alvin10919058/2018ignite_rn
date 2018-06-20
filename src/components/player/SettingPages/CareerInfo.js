import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CareerInfo extends Component {
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <Text>CareerInfo</Text>
                <Text
                    style={{ color: 'blue' }} 
                    onPress={() => { Actions.pop(); }}
                >
                back</Text>
            </View>
            );
        }
}

const styles = {
    container: {
        flex: 1
    }
};    

export default CareerInfo;
