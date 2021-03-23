import React, {Children, Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Navigator from '../utils/Navigator';
import {colors, fonts, metrics} from '../utils/Theme';

export default class TopTiltedCard extends Component {
  render() {
    return (
      <View>
          <View style={this.props.style}>
            <View style={styles.tiltedTop}>
                <View style={[styles.circle, styles.left]}></View>
                <View style={[styles.circle, styles.right]}></View>
                <View style={styles.innerTilt}></View>
            </View>
                {this.props.children}
            {/* <View style={styles.cardBase}>
                <View style={styles.body}>
                    <View style={styles.content}>
                        <View>

                        <Text style={[styles.title]} numberOfLines={2} ellipsizeMode="tail">Endless Lip Shine Sweet pounch</Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image source={require('../../assets/images/CalvinKlein1.png')} style={styles.image} />
                        </View>
                    </View>
                </View>
                <View style={styles.details}>
                    <Text style={{fontSize:10, color:colors.secondary}} >DETAILS</Text>
                </View>
            </View> */}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
    tiltedTop:{
        width:metrics.width * 0.4,
        height:0, 
        backgroundColor:'transparent',
        borderTopWidth:25,
        borderLeftWidth:metrics.width * 0.4,
        borderLeftColor:colors.white,
        borderTopColor:'transparent',
        marginLeft:20,
        position:'relative',
        top:0,
        left:0
    },
    circle:{
        width:30,
        height:30, 
        backgroundColor:colors.white,
        borderRadius:30,
        position:'absolute',
    },
    left:{
        top:-37,
        left:-metrics.width * 0.4
    },
    right:{
        top:-12,
        left :-30,
    },
    innerTilt:{
        width:((metrics.width * 0.4)-30),
        height:20, 
        backgroundColor:'transparent',
        borderTopWidth:25,
        borderBottomWidth:25,
        borderBottomColor:colors.white,
        borderLeftWidth:((metrics.width * 0.4)-30),
        borderLeftColor:colors.white,
        borderTopColor:'transparent',
        marginLeft:20,
        position:'absolute',
        top:-37,
        left:(-metrics.width * 0.4)-5
    },
    // content:{
    //     flex:1,
    //     justifyContent:'center',
       
    // },
    // title:{
    //     textAlign:'center'
    //     // paddingHorizontal:metrics.smallMargin,
    // },
    // imgContainer:{
    //     justifyContent:'center',
    //     alignItems:'center',
    //     flex:1,
    //     paddingHorizontal:metrics.defaultMargin,
    //     paddingBottom:metrics.defaultMargin
    // },
    // image:{
    //     width:'100%',
    //     height:'100%',
    //     resizeMode:'contain'
    // }
});
