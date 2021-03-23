import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

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
import {addItem, deleteItem, emptyCart} from '../Redux/actions';
import Cart from '../../assets/images/cart.png';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      visible: false,
      loading: false,
    };
    this.inputs = {};
  }

  onChange(name, val) {
    console.log({[name]: val});
    this.setState({[name]: val});
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  async apiCall() {
    this.setState({loading: true});
    const res = await fetch('https://reactnativeapps.herokuapp.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fname,
        lastname: this.state.lname,
        phonenumber: this.state.phoneNumber,
        address: this.state.phoneNumber,
        slotdatetime: new Date().toString(),
        email: this.state.email,
        appname: 'GroceryHouse',
        item: JSON.stringify(this.props.route.params.item),
      }),
    });

    const response = await res.json();
    this.setState({loading: false});
    if (response.status) this.setState({visible: true});
    else Toast('Some error occurred');
  }

  onButtonPress() {
    if (!Validation.isValidField(this.state.fname || '')) {
      return Toast('Please Enter Your First Name');
    }
    if (!Validation.isValidField(this.state.lname || '')) {
      return Toast('Please Enter Your Last Name');
    }
    if (!Validation.isValidField(this.state.email || '')) {
      return Toast('Please Enter Email');
    }
    if (!Validation.isEmailValid(this.state.email || '')) {
      return Toast('Please Enter Valid Email');
    }
    if (!Validation.isValidField(this.state.address || '')) {
      return Toast('Please Enter Address');
    }
    if (!Validation.isValidField(this.state.phoneNumber || '')) {
      return Toast('Please Enter Valid Phone Number');
    }

    this.apiCall();
  }

  render() {
    return (
      <Wrapper bottom={0}>
        <Header textStyle={{fontWeight: 'bold'}} title="Checkout" />

        <OrderPlaced
          visible={this.state.visible}
          onPress={() => {
            this.setState({visible: false});
            this.props.emptyCart();
            Navigator.navigateAndReset('Home');
          }}
        />

        {this.props.cart.items.length > 0 ? (
          <>
            <KeyboardAwareScrollView
              bounces={false}
              style={{
                flex: 1,
                paddingHorizontal: metrics.defaultMargin,
              }}>
              <View style={{flex: 1}}>
                {this.props.cart.items.map(item => (
                  <CartItem
                    item={item}
                    quantity={item.quantity}
                    onAdd={() => this.props.addItem(item)}
                    onMinus={() => this.props.deleteItem(item)}
                  />
                ))}

                <Input
                  required
                  placeholder="First Name"
                  label="First name"
                  textValue={this.state.fname}
                  returnKeyType="next"
                  onRef={ref => {
                    this.inputs['fname'] = ref;
                  }}
                  onChangeText={text => {
                    this.onChange('fname', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('lname');
                  }}
                />
                <Input
                  required
                  placeholder="Last Name"
                  label="Last name"
                  textValue={this.state.lname}
                  returnKeyType="next"
                  onRef={ref => {
                    this.inputs['lname'] = ref;
                  }}
                  onChangeText={text => {
                    this.onChange('lname', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('email');
                  }}
                />
                <Input
                  required
                  placeholder="Email"
                  label="Email"
                  keyboardType={'email-address'}
                  textValue={this.state.email}
                  returnKeyType="next"
                  onRef={ref => {
                    this.inputs['email'] = ref;
                  }}
                  onChangeText={text => {
                    this.onChange('email', text);
                  }}
                  onSubmitEditing={() => {
                    this.focusNextField('phoneNumber');
                  }}
                />
                <Input
                  required
                  placeholder="Mobile Number"
                  label="Mobile No."
                  textValue={this.state.phoneNumber}
                  returnKeyType="next"
                  onRef={ref => {
                    this.inputs['phoneNumber'] = ref;
                  }}
                  onChangeText={text => {
                    this.onChange('phoneNumber', text);
                  }}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => {
                    this.focusNextField('address');
                  }}
                />
                <Input
                  required
                  placeholder="Address"
                  label="Address"
                  textValue={this.state.address}
                  onRef={ref => {
                    this.inputs['address'] = ref;
                  }}
                  onChangeText={text => {
                    this.onChange('address', text);
                  }}
                  multiline={true}
                  inputStyle={{height: 100}}
                />
              </View>
              <SafeAreaInsetsContext.Consumer>
                {insets => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.onButtonPress();
                    }}>
                    <View
                      style={[
                        styles.buttonView,
                        {paddingBottom: insets.bottom ? insets.bottom : 15},
                      ]}>
                      {this.state.loading ? (
                        <BarIndicator color="white" size={24} />
                      ) : (
                        <>
                          <Text style={styles.buttonText}>Order Now</Text>
                        </>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                )}
              </SafeAreaInsetsContext.Consumer>
            </KeyboardAwareScrollView>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Cart} />
          </View>
        )}
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.primaryBold,
    fontSize: 28,
    marginVertical: metrics.defaultMargin,
  },
  buttonView: {
    backgroundColor: 'rgba(34,157,86,0.7)',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    paddingHorizontal: 30,
    // marginLeft: metrics.defaultMargin,
    minHeight: 80,
    // marginRight: metrics.defaultMargin,
  },
  buttonText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconView: {
    backgroundColor: 'rgb(255,255,255)',
    width: 50,
    marginRight: '5%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
  },
  icon: {
    fontSize: 28,
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
  },
  text: {
    fontFamily: fonts.secondary,
    fontSize: 16,
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem, emptyCart})(
  Checkout,
);
