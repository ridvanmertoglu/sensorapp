import Login from '../Login';
import Register from '../Register';
import Home from '../Home';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {AsyncStorage} from 'react-native';

const x = async () => {
  let result = '';
  result = await AsyncStorage.getItem('expireTime');
  if (result !== null) {
    return 'Home';
  }
  return 'Login';
};
const a = () => {
  return x();
}
console.log(a());
const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Home: {
      screen: Home,
    },
  },
  {
    initialRouteName:
      AsyncStorage.getItem('expireTime') instanceof String ? 'Home' : 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
