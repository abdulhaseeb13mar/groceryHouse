import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  Wrapper,
} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import data from '../../data'

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {item,index,onPress,selected} = this.props;
    return (
        <TouchableWithoutFeedback
          onPress={onPress}>
          <View style={styles.category}>
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    selected ? colors.secondary: colors.grey,
                    fontFamily:selected ? fonts.primaryBold:fonts.primary
                },
              ]}>
              {item.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
  }
}

const styles = StyleSheet.create({
    category: {
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:colors.primary,
      borderRadius:10,
      paddingHorizontal:10,
      marginRight:metrics.smallMargin
      
    },
    categoryText: {
      fontFamily: fonts.primary,
      fontSize: 14,
      textAlign: 'center',
      width:'100%',
      marginVertical:10
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 5,
      marginTop:5
    },
  });
  