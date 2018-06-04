import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
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
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    const { backgroundStyle, loginInputStyle, errorTextStyle } = styles;
    return (
      <View style={backgroundStyle}>
        <Image
          style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 20 }}
          source={Logo}
        />
        
          <CardSection style={loginInputStyle}>
            <Image
            style={{ width: 30, height: 30 }}
            source={User}
            />
            <Input
              placeholder="team@ignite.app"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
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
            />
          </CardSection>

          <Text style={errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection style={[loginInputStyle, { borderBottomWidth: 0 }]}>
            {this.renderButton()}
          </CardSection>
      
      </View>
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
    backgroundColor: 'white',
    //justifyContent:'center',
    alignItems: 'center',
    paddingTop: 80,
    flex: 1
  },
  loginInputStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);
