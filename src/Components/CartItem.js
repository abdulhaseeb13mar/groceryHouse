import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts, metrics} from '../utils/Theme';
import data from '../../data';
import Navigator from '../utils/Navigator';


export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // getImage(){
  //   let filterData=data.image.find((item=>(
  //     item.productid==this.props.item.id
  //   )))
  //   // console.log('images', filterData)
  //   return filterData.image
  //   // this.setState({productImage:image ? image.image : ''},()=>console.log('imagessss', this.state.productImage))
  // }

  getCategoryName=(id)=>{
    let name= data.category.filter((cat)=>(
      cat.id===id
    ))
    return name[0].name
  }
  render() {
    // const image=this.getImage()

    const {name,categoryid,days,country, description, price,bgcolor,isFav, image} = this.props.item;

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          Navigator.navigate('ProductDetail', {
            item: this.props.item,
            category: this.props.item.categoryid,
          })
        }>

        <View style={[styles.container]}>
          <View style={{flexDirection: 'row', flex: 1, }}>
            <View style={styles.imgContainer}>
              <Image
                style={[styles.image, {backgroundColor: bgcolor}]}
                source={image}
              />
            </View>
    
            <View style={{flex: 1, justifyContent:'space-between',marginLeft:metrics.defaultMargin,}}>
              <Text numberOfLines={2} style={styles.title}>
                {name}
              </Text>
        
              <Text style={styles.pricetag} numberOfLines={1} ellipsizeMode="tail">${price}</Text>
            </View>
          </View>
          <View style={styles.quantityView}>
            {/* <Icon
              name="plus-box"
              style={styles.icon}
              color='black'
              onPress={this.props.onAdd}
            /> */}
            <Text style={styles.quantity}>x {this.props.quantity}</Text>
            {/* <Icon
              name="minus-box"
              style={styles.icon}
              onPress={this.props.onMinus}
            /> */}
          </View>
        </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: metrics.defaultMargin,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // borderRadius: 20,
    overflow: 'hidden',
    backgroundColor:'white',
    // borderColor:'red',
    // borderWidth:1,
    // margin:metrics.defaultMargin,
    
  },
  image: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    // marginRight: 20,
    backgroundColor:'white',
    resizeMode:'contain',
  },
  headingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,

    backgroundColor: colors.primary,
    opacity: 0.5,
    width: 100,
    height: 100,
  },
  pricetag:{
    fontSize:20,
    fontFamily:fonts.secondaryBold,
    color:colors.white,
    marginVertical: 5,
    fontWeight:'bold'

  },
  priceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  
  },
  title: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    fontWeight:'bold',
    color:colors.primary,
    // marginTop:4,
    marginVertical: 5,
  },
  price: {
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    marginBottom: 5,
  },
  quantityView: {
    // backgroundColor: colors.secondary,
    padding: 5,
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  quantity: {
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: fonts.primaryBold,
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  desc: {
    color: colors.grey,
    marginVertical: 5,
    fontFamily: fonts.secondary,
  },
 
  dot: {
    fontSize:7,
    paddingBottom:5,
  },
  imgContainer:{
    backgroundColor:'rgba(34,157,86,0.2)',
    paddingHorizontal:10,
    borderRadius:15
    // padding:5,
  }
});
