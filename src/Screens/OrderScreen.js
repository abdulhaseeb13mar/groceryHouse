import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import bg from '../../assets/images/bg2.png';


import {CartItem, Header, Input, Wrapper} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navigator from '../utils/Navigator';

import Validation from '../utils/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from '../utils/Toast';
import OrderPlaced from '../Components/OrderPlaced';
import {BarIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import {addItem, deleteItem} from '../Redux/actions';
import Cart from '../../assets/images/cart.png';

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  render() {
    return (
      <Wrapper bottom={0}>
        {/* <ImageBackground style={{flex:1, }} source={bg}> */}
        <Header title="Your Order" />

        {this.props.cart.items.length > 0 ? (
          <>
            <KeyboardAwareScrollView
              bounces={false}
              style={{
                flex: 1,
                // paddingHorizontal: metrics.defaultMargin,
              }}>
              {this.props.cart.items.map((item) => (
                <CartItem
                  item={item}
                  quantity={item.quantity}
                  onAdd={() => this.props.addItem(item)}
                  onMinus={() => this.props.deleteItem(item)}
                />
              ))}
              <View style={{margin: metrics.defaultMargin}}>
                <View style={styles.info}>
                    <Text style={styles.title}>Delivery Time</Text>
                    <Text style={styles.text}>45 mins</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>Payment Mode</Text>
                    <Text style={styles.text}>Payment on Delivery</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.title}>Total</Text>
                    <Text style={[styles.title]}>
                    ${parseInt(this.props.cart.totalPrice) * this.state.quantity}
                    </Text>
                </View>
              </View>
            </KeyboardAwareScrollView>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => (
                <TouchableWithoutFeedback
                onPress={() =>
                  Navigator.navigate('Checkout')}
                >
                  <View style={{flexDirection:'row', justifyContent:'center'}} >
                    <Text  style={styles.buttonText}>Confirm Order</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </SafeAreaInsetsContext.Consumer>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Cart} />
          </View>
        )}
      {/* </ImageBackground> */}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    borderTopStartRadius: 30,
    paddingHorizontal: 30,
    marginLeft: metrics.defaultMargin,
    minHeight: 80,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    // fontWeight:'bold',
    color:colors.primary
    
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
    color: colors.black,
  },
  buttonText: {
    color: colors.secondary,
    // marginTop:8,
    marginVertical: metrics.defaultMargin,
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    // fontWeight:'bold',
    textAlign:'center',
    padding:10,
    borderTopLeftRadius:20,
    borderBottomRightRadius:20,

    backgroundColor:colors.primary,
    // borderWidth:1,
    width:'80%',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem})(
  OrderScreen,
);
