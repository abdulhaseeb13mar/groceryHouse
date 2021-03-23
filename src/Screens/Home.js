import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
  FoodCard,
  FoodIcon,
  HorizontalList,
  ItemCard,
  SearchBar,
  Wrapper,
} from '../Components';
import {colors, fonts, metrics} from '../utils/Theme';
import data from '../../data';
import Category from '../Components/Category';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Navigator from '../utils/Navigator';
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '1',
      categories: [],
      items: [],
      recommended: [],
    };
  }

  componentDidMount() {
    // const items = this.props.products.filter(
    //   (val) => val.categoryid == this.state.selectedCategory,
    // );
    const recommended = this.props.products.filter((val) => val.recommended);
    this.setState({
      items: this.props.products,
      recommended: recommended,
    });
  }

  selectCategory = (item) => {
    this.setState({selectedCategory: item.id});
    const items = this.props.products.filter(
      (val) => val.categoryid == item.id,
    );
    this.setState({items: items});
  };

  UNSAFE_componentWillReceiveProps(props) {
    const items = props.products.filter(
      (val) => val.categoryid == this.state.selectedCategory,
    );
    const recommended = props.products.filter((val) => val.recommended);
    this.setState({
      items: items,
      recommended: recommended,
    });
  }

  render() {
    console.log('render items', this.state.items)
    return (
      <Wrapper>
        <ScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
            
          <View style={styles.headingContainer}>
          <Text style={styles.heading}>
           Grocery House
          </Text>
          <Icon
              onPress={() => Navigator.navigate('Checkout')}
              name="cart"
              style={styles.icon}
            />
          </View>
          
          <Text style={styles.subMainHeading}>Find fresh fruits what you want</Text>
          <View style={{marginVertical:metrics.defaultMargin}} >
            <SearchBar disabled />
          </View>

          {/* <View style={{marginTop:10}}>
            <HorizontalList
              data={data.category}
              renderItem={({item}) => (
                <Category
                  item={item}
                  selected={item.id == this.state.selectedCategory}
                  onPress={() => this.selectCategory(item)}
                />
              )}
            />
          </View> */}

          <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:metrics.defaultMargin, marginBottom: metrics.defaultMargin}} >
            <Text style={styles.subHeading}>Top Selling</Text>
            <TouchableWithoutFeedback
              // style={{backgroundColor:'red', padding:20}}
              onPress={() => Navigator.navigate('Search')}
            >
              <Text style={{fontSize:16, color: colors.grey}} >See All</Text>
            </TouchableWithoutFeedback>
          </View>

            <HorizontalList
            data={this.state.recommended}
              // data={this.state.items}
              renderItem={({item}) => (
                <FoodCard item={item} />
              )}
            />


          {/* <Text style={[styles.subHeading,{marginHorizontal:metrics.defaultMargin, marginBottom: metrics.defaultMargin}]}>Recommended</Text>
          <HorizontalList
            data={this.state.recommended}
            renderItem={({item}) => <ItemCard item={item} />}
          /> */}
              <Text style={[styles.subHeading, {marginHorizontal:metrics.defaultMargin, marginBottom: metrics.defaultMargin}]}>Favourites</Text>
          {this.props.favProducts.length > 0 ? (
            <>
              <HorizontalList
                data={this.props.favProducts}
                renderItem={({item}) => <ItemCard item={item} />}
              />
            </>
          ):
          (
            <View style={styles.favInfo}>
              <Text style={styles.favText}>Add Your Favouite Fruits</Text>
            </View>
          )}
        </ScrollView>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginHorizontal: metrics.defaultMargin,
    marginTop:metrics.largeMargin,

    // marginBottom:0,
    // marginVertical:0,
    // flex:1,
    // borderColor:'red',
    // borderWidth:1
  },
  heading: {
    fontSize: 28,
    // margin: metrics.defaultMargin,
    marginBottom: 5,
    // marginLeft:0,
    fontWeight:'bold',
    // color:colors.primary,
    // backgroundColor:'red'
  },
  subMainHeading:{
    fontFamily: fonts.primary,
    fontSize: 18,
    marginHorizontal: metrics.defaultMargin,
    // marginRight: metrics.width * 0.35,
    // fontWeight:'bold',
    color:colors.grey
  },
  subHeading: {
    fontWeight:'bold',
    fontSize: 20,
    // marginHorizontal: metrics.defaultMargin,
    // marginBottom : metrics.defaultMargin
  },
  category: {
    transform: [{rotate: '270deg'}],
    marginVertical: 15,
    marginLeft: metrics.smallMargin,
    textAlign: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: fonts.primary,
    fontSize: 16,
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 32,
    color: colors.primary,
  },
  favInfo:{
    backgroundColor: 'rgba(34,157,86,0.2)',
    paddingVertical:metrics.largeMargin,
    marginHorizontal:metrics.defaultMargin,
    borderRadius:30
  },
  favText:{
    textAlign:'center',
    color: colors.primary,
    fontSize:16,
    lineHeight:25
  },
});

const mapStateToProps = (state) => {
  return {
    products: state.products,
    favProducts: state.favProducts,
  };
};

export default connect(mapStateToProps)(Home);
