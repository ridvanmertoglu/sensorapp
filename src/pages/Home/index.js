import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import getSensors from '../../api';
import {styles} from './styles';

export default class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity onPress={params.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: false,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      sensorList: null,
      listedSensors: null,
      loading: true,
      text: '',
    };
  }

  componentDidMount() {
    this.showSensors();
    this.props.navigation.setParams({logout: this._logout.bind(this)});
  }

  showSensors = async () => {
    this.setState({sensorList: await getSensors()});
    if (Array.isArray(this.state.sensorList)) {
      this.setState({listedSensors: this.state.sensorList, loading: false});
    }
  };

  renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <Text style={styles.sensorName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  searchFilter = (text) => {
    const newData = this.state.sensorList.filter((item) => {
      const listItem = `${item.name.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      listedSensors: newData,
    });
  };

  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
    );
  };
  _logout = () => {
    AsyncStorage.removeItem('app_token');
    AsyncStorage.removeItem('expireTime');
    this.props.navigation.navigate('Login');
  };

  render() {
    let expireTime = 0;
    AsyncStorage.getItem('expireTime').then((res) => {
      if (res !== null) {
        expireTime = res;
      }
    });
    let date = new Date();
    setInterval(() => {
      if (expireTime !== 0 && Number.parseInt(expireTime) < date.getTime()) {
        this._logout();
      }
      date = new Date();
    }, 1000);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            ListHeaderComponent={this.renderHeader()}
            renderItem={this.renderContactsItem}
            data={this.state.listedSensors}
          />
        )}
      </SafeAreaView>
    );
  }
}
