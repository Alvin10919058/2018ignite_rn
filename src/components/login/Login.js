import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView } from 'react-native';
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
        <Image
          style={{ width: 170, height: 170, alignSelf: 'center', marginBottom: 20 }}
          source={Logo}
        />
        
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
            style={{ width: 25, height: 25, marginRight: 2.5, marginLeft: 2.5 }}
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

          <CardSection style={[loginInputStyle, { borderBottomWidth: 0 }]}>
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
    color: 'red'
  },
  backgroundStyle: {
    backgroundColor: '#ecf5ff',
    //justifyContent:'center',
    alignItems: 'center',
    paddingTop: 80,
    flex: 1
  },
  loginInputStyle: {
    backgroundColor: '#ecf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  }
};

const mapStateToProps = ({ auth }) => {
  const { username, password, error, loading } = auth;

  return { username, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);
