import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {metrics, colors, text} from '../utils/Theme';

import Icon from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';

const height = metrics.height * 0.05;

export default function SearchBar(props) {
  const {
    onPress = () => Navigator.navigate('Search'),
    disabled = false,
  } = props;
  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.iconView}>
        <Icon name="search1" size={24} color={colors.primary}></Icon>
      </View>
      {!disabled ? (
        <TextInput
          // autoFocus={true}
          placeholder={'Search fresh fruits'}
          placeholderTextColor={colors.grey}
          style={{...styles.textInput, borderBottomColor:colors.primary, borderBottomWidth:1, color: colors.primary,}}
          {...props}
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            if (disabled && onPress) {
              onPress();
            }
          }}>
          <View style={{...styles.textInput,  justifyContent: 'center', borderBottomColor:colors.primary, borderBottomWidth:1}}>
            <Text style={{color: colors.grey, fontSize: 16}}>Search fresh fruits</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: metrics.defaultMargin,
    marginVertical: metrics.smallMargin,
    shadowColor: colors.lightGrey,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  iconView: {
    height: height + 10,
    width: height + 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // backgroundColor:colors.secondary,
    position: 'absolute',
    left: -5,
    top: -5,
    zIndex: 2,
  },
  textInput: {
    flex: 7,
    height: height,
    fontSize: 16,
    paddingHorizontal: 15,
    // borderRadius: 20,
    paddingLeft: 50,
  },
});
