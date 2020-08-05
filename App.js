import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Navigator from './src/pages/Navigator';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
