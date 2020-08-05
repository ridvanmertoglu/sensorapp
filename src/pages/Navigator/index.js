import Login from '../Login';
import Register from '../Register';
import Home from '../Home';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {AsyncStorage} from 'react-native';

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
