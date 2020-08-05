import React, {Component} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {styles} from './styles';

export default class SpecificButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={this.props.buttonStyle}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.buttonIcon} source={this.props.source} />
          <Text style={this.props.buttonNameStyle}>
            {this.props.buttonTitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
