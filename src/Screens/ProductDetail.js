import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native';
import {View, Text} from 'react-native';
import {HorizontalList, Wrapper} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Navigator from '../utils/Navigator';
import data from '../../data';
import {connect} from 'react-redux';
import {addItem, deleteItem} from '../Redux/actions';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addItem = () => {
    this.props.addItem(this.props.route.params.item);
  };

  deleteItem = () => {
    this.props.deleteItem(this.props.route.params.item);
  };

  render() {
    const {
      name,
      image,
      description,
      price,
      bgcolor,
      id,
    } = this.props.route.params.item;

    const flag = this.props.cart?.items.filter((val) => val.id == id);
    const quantity = flag.length !== 0 ? flag[0].quantity : 0;

    return (
      <Wrapper bottom={0} style={{backgroundColor: colors.secondary}}>
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
        {/* <View style={{flex: 1, backgroundColor:'red'}} > */}

          <View style={styles.backview}>
          <View style={styles.imageView}>
            <Image style={styles.image} source={image} />
          </View>
            </View> 
          {/* <View style={styles.imageView}>
            <Image style={styles.image} source={image} />
          </View> */}
          <TouchableWithoutFeedback onPress={() => Navigator.goBack()}>
            <View style={styles.backIcon}>
              <Icon name="chevron-back" color="black" size={30} />
            </View>
          </TouchableWithoutFeedback>
          <View style={{paddingHorizontal: metrics.defaultMargin}}>
            <Text style={[styles.heading,{marginTop:70, marginBottom: metrics.defaultMargin,}]}>{name}</Text>
            {/* <Text style={styles.smallHeading}>Description:</Text> */}
            <Text style={styles.text}>{description}</Text>

            <View style={{flexDirection:'row', marginBottom: metrics.defaultMargin}} >
              <View style={{backgroundColor:colors.lightBackground, justifyContent:'center', padding: metrics.smallMargin, marginRight: 10, borderRadius:10}}>
                <Icon name="timer-outline" color="black" size={30} />
              </View>
              <View style={{}}>
                <Text style={{fontSize:18, fontWeight:'bold'}} >Delivery Time</Text>
                <Text>45 minutes</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', marginBottom: metrics.defaultMargin}} >
              <View style={{backgroundColor:colors.lightBackground, justifyContent:'center', padding: metrics.smallMargin, marginRight: 10, borderRadius:10}}>
                <Icon name="cash-outline" color="black" size={30} />
              </View>
              <View style={{}}>
                <Text style={{fontSize:18, fontWeight:'bold'}} >Payment Mode</Text>
                <Text>Payment on Delivery</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom: metrics.defaultMargin,}} >
              <View >
                <Text style={styles.heading}>${price.replace('$', '')}</Text>
              </View>
              <View style={styles.quantityView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.deleteItem}
                  style={styles.iconView}>
                  <Icon name="remove" style={{...styles.icon}} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.addItem}
                  style={styles.iconView}>
                  <Icon name="add" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
        </View>
        {/* </View> */}
            
        </ScrollView>
        <TouchableWithoutFeedback
              onPress={() =>
                Navigator.navigate('Checkout', {
                  item: this.props.route.params.item,
                })
              }>
              <View
                style={[
                  styles.buttonView,
                  
                ]}>
                <Text style={styles.buttonText}>Add to cart</Text>
              </View>
            </TouchableWithoutFeedback>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: metrics.width,
    height: '80%',
    resizeMode: 'contain',
    justifyContent:'flex-end',
    position:'relative', bottom:-70
  },
  heading: {
    fontFamily: fonts.secondaryBold,
    fontSize: 28,
    fontWeight:'bold'
    // marginBottom: metrics.defaultMargin,
    // color: colors.secondary,
    
  },
  smallHeading: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    marginBottom: metrics.defaultMargin,
  },
  text: {
    fontFamily: fonts.primary,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: metrics.defaultMargin,
    color: colors.grey,
  },
  imageView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonView: {
    backgroundColor:'rgba(34,157,86,0.7)',

    // backgroundColor: colors.primary,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius:30,
    paddingHorizontal: 30,
    marginHorizontal: metrics.defaultMargin,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight:'bold'
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: metrics.defaultMargin,
    // backgroundColor: colors.background,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: metrics.defaultMargin,
    backgroundColor:'transparent',
    borderRadius: 5,
    borderColor: colors.lightBackground,
    borderWidth:1
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backview:{
    backgroundColor:'rgba(34,157,86,0.7)',
    // backgroundColor: colors.primary,

    width: metrics.width,
    height:180,
    position:'relative',
    top:0,
    left:0,
    borderBottomRightRadius:35,
    borderBottomLeftRadius:35,
  }
});

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer,
  };
};

export default connect(mapStateToProps, {addItem, deleteItem})(ProductDetail);
