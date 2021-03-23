import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Image } from 'react-native';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  Wrapper,
  TopTiltedCard
} from '../Components';
import { colors, fonts, metrics } from '../utils/Theme';
import data from '../../data'

export default class ColorPatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { item, index, onPress, selected } = this.props;
    console.log('itemmm', item)
    return (
      <View>

      </View>
      );
  }
}

const styles = StyleSheet.create({
 
});
