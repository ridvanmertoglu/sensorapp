import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
import getSensors from '../../api';

export default class Home extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity onPress={params.logout}>
          <Text style={{marginHorizontal: 10}}>Logout</Text>
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

  showSensors = async () => {
    this.setState({sensorList: await getSensors()});
    if (Array.isArray(this.state.sensorList)) {
      this.setState({listedSensors: this.state.sensorList, loading: false});
    }
  };
  componentDidMount() {
    this.showSensors();
    this.props.navigation.setParams({logout: this._logout.bind(this)});
  }
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
    console.log(AsyncStorage.removeItem('expireTime'));
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
      <SafeAreaView style={{flex: 1}}>
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

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#add8e6',
  },
  sensorName: {
    fontSize: 20,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    fontSize: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 15,
  },
});
