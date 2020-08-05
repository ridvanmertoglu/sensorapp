import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TextInput,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {images} from '../../utils/images';

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
    headerShown: false,
  };
  state = {email: '', password: '', confirmPasword: '', showSpinner: false};

  clickConfirm = async () => {
    this.setState({showSpinner: true});
    try {
      const isRegister = await auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      this.setState({showSpinner: false});
      if (isRegister.user) {
        this.props.navigation.navigate('Home');
      }
    } catch (e) {
      this.setState({showSpinner: false});
      if (this.state.password.length < 6) {
        Alert.alert('Your password should be least 6 character.');
      } else {
        Alert.alert(
          "Your email address format should be 'example@example.com'.",
        );
      }
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={styles.keyboardAvoidingView}>
          <View style={styles.container}>
            <Image style={styles.logo} source={images.signUpImage} />
            <View style={styles.subContainer}>
              <TextInput
                placeholder="E-mail"
                autoCapitalize="none"
                placeholderTextColor="#333"
                style={styles.inputStyle}
                value={this.state.email}
                onChangeText={(givenText) => this.setState({email: givenText})}
              />
            </View>

            <View style={styles.subContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#333"
                secureTextEntry={true}
                style={styles.inputStyle}
                value={this.state.password}
                onChangeText={(givenText) =>
                  this.setState({password: givenText})
                }
              />
            </View>

            <View style={styles.subContainer}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#333"
                secureTextEntry={true}
                style={styles.inputStyle}
                value={this.state.confirmPasword}
                onChangeText={(givenText) =>
                  this.setState({confirmPasword: givenText})
                }
              />
            </View>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => {
                this.state.password === this.state.confirmPasword
                  ? this.clickConfirm()
                  : Alert.alert('Passwords do not match.');
              }}>
              {this.state.showSpinner ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.loginText}>CONFIRM</Text>
              )}
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
