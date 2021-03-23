import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Header from '../Components/Header';
import Button from '../Components/Button';
import RootView from '../Components/Wrapper';
import SearchBar from '../Components/SearchBar';
import CardComponent from '../Components/FoodCard';
import {colors, fonts, metrics, text} from '../utils/Theme';
import {connect} from 'react-redux';
import data from '../../data';
import {ItemCard} from '../Components';

function SearchScreen(props) {
  const [list, setlist] = useState(data.items);
  const [searchQueryText, setsearchQueryText] = useState('');

  useEffect(() => {
    var updated_list = props.products.filter((val) =>
      val.name.toLowerCase().includes(searchQueryText.toLowerCase()),
    );
    setlist(updated_list);
  }, [props, searchQueryText]);

  return (
    <RootView>
      <Header textStyle={{fontWeight:'bold'}} title={'All Fruits'}></Header>
      <SearchBar onChangeText={(value) => setsearchQueryText(value)} />
      <View style={{margin: metrics.defaultMargin}}>
      <Text>
          <Text style={{fontFamily: fonts.primary, }}>Found </Text>
          <Text style={{fontWeight:'bold', color: colors.primary, fontSize:16}}>{list.length} Fruits</Text>
        </Text>
      </View>
      <FlatList
       showsVerticalScrollIndicator={false}
       horizontal={false}
       numColumns={2}
       bounces={false}
       data={list}
       style={{padding: metrics.defaultMargin}}
       keyExtractor={() => Math.random().toString()}
        renderItem={({item}) => (
          <ItemCard
            item={item}
            container={{width: metrics.width * 0.42, marginBottom:metrics.smallMargin}}
            imageStyle={{width:150, height:150}}
            showFav={true}
            // style={{marginBottom: metrics.defaultMargin, width: '100%'}}
          />
        )}
      />
    </RootView>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(SearchScreen);
