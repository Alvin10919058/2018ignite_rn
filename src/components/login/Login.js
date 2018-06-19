import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView, View } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { CardSection, Input, Button, Spinner } from '../common';
import { Logo, User, Password } from '../../images';

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password } = this.props;

    this.props.loginUser({ username, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        LOGIN
      </Button>
    );
  }

  render() {
    const { backgroundStyle, loginInputStyle, errorTextStyle } = styles;
    return (
      <KeyboardAvoidingView style={backgroundStyle} behavior="padding" enabled>
        <View style={{ flex: 6, justifyContent: 'center' }}>
          <Image
            style={{ 
              width: 170, 
              height: 170, 
              alignSelf: 'center'
            }}
            source={Logo}
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'flex-start', marginTop: 14 }}>
          <CardSection style={loginInputStyle}>
            <Image
            style={{ width: 30, height: 30 }}
            source={User}
            />
            <Input
              placeholder="username"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.username}
              placeholderTextColor='#9d9d9d'
              underlineColorAndroid={'transparent'}
            />
          </CardSection>

          <CardSection style={loginInputStyle}>
            <Image
            style={{ width: 25, height: 25 }}
            source={Password}
            />
            <Input
              secureTextEntry
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              placeholderTextColor='#9d9d9d'
              underlineColorAndroid={'transparent'}
            />
          </CardSection>

          <Text style={errorTextStyle}>
            {this.props.error}
          </Text>

        </View>

          <CardSection style={[loginInputStyle, { borderBottomWidth: 0, flex: 4, alignItems: 'flex-start', marginTop: 20 }]}>
            {this.renderButton()}
          </CardSection>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    flex: 1
  },
  backgroundStyle: {
    backgroundColor: '#ecf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  loginInputStyle: {
    backgroundColor: '#ecf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
  }
};

const mapStateToProps = ({ auth }) => {
  const { username, password, error, loading } = auth;

  return { username, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);
