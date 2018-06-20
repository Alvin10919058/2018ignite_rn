import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Policy extends Component {
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <Text>Policy</Text>
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

export default Policy;
