import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
  onClick() {
    Actions.teamInfo();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.onClick}>TeamInfo</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export default Login;
