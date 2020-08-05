import React from 'react';
import {View, StyleSheet} from 'react-native';
import Navigator from './src/pages/Navigator';

const App = () => {
  return (
    <View style={styles.container}>
      <Navigator />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
