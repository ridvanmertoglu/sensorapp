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
  AsyncStorage,
} from 'react-native';

import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {images} from '../../utils/images';
import SpecificButton from '../../components/SpecificButton';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerShown: false,
  };
  state = {email: '', password: '', showSpinner: false};

  clickLogin = async () => {
    this.setState({showSpinner: true});
    try {
      const isLogin = await auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      const currentDateTime = new Date();
      const expireDateTime = new Date(
        currentDateTime.setHours(currentDateTime.getHours() + 1),
      );
      AsyncStorage.setItem('expireTime', expireDateTime.getTime().toString());
      this.setState({showSpinner: false});
      if (isLogin.user) {
        this.props.navigation.navigate('Home', {
          clearData: this.setState({
            email: '',
            password: '',
            showSpinner: false,
          }),
        });
      }
    } catch (e) {
      this.setState({showSpinner: false});
      Alert.alert('Your E-mail or password incorrect.');
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={'padding'}>
          <View style={styles.container}>
            <Image style={styles.logo} source={images.loginImage} />
            <View style={styles.subContainer}>
              <TextInput
                placeholder="E-mail"
                autoCapitalize="none"
                placeholderTextColor="#333"
                style={styles.textInput}
                value={this.state.email}
                onChangeText={(givenText) => this.setState({email: givenText})}
              />
            </View>

            <View style={styles.subContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#333"
                secureTextEntry={true}
                style={styles.textInput}
                value={this.state.password}
                onChangeText={(givenText) =>
                  this.setState({password: givenText})
                }
              />
            </View>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.clickLogin}>
              {this.state.showSpinner ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.loginText}>LOGIN</Text>
              )}
            </TouchableHighlight>
            <SpecificButton
              buttonStyle={styles.signUpButtonContainer}
              buttonTitle={'Sign Up'}
              buttonNameStyle={styles.signUpButton}
              onPress={() => this.props.navigation.navigate('Register')}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
