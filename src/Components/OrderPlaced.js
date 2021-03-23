import React, {Component} from 'react';
import {Modal, Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';

export default class OrderPlaced extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.centeredView}>
            <View style={styles.iconView}>
              <Icon name="check" color={colors.primary} size={54} />
            </View>
            <Text style={[styles.title]}>
              Order placed!
            </Text>
              <Text style={{fontSize:16, textAlign:'center', marginBottom: 20 }}>
              Thankyou, you will soon receive your fresh fruits.
              </Text>
            <View style={{borderRadius: 10, overflow: 'hidden',marginVertical:10}}>
              <Text onPress={this.props.onPress} style={styles.button}>Ok</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
  },
  centeredView: {
    backgroundColor: 'white',
    width: metrics.width * 0.8,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
  },
  iconView: {
    backgroundColor: 'rgba(34,157,86,0.2)',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight:'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: metrics.smallMargin,
  },
  button: {
    backgroundColor: 'rgba(34,157,86,0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight:'bold'
  },
});
