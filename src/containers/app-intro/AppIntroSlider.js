import React, { Component } from 'react';
import {
    View,
    Text,FlatList,
    Image,StyleSheet,
    Platform,
    Dimensions,TouchableOpacity
} from 'react-native';

import style_common from '../../style-common'
import ItemSlider from './ItemSlider'
const { width, height } = Dimensions.get('window');
const heightHeader = 100;
const isIphoneX = (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
class GioiThieuAbetra extends Component {
    constructor(props){
        super(props)
        this.state = {
            width,
            height,
            activeIndex: 0,
        }

        this.slides = [
            {
              id: 'somethun',
              title: 'Title 1',
              text: 'Description.\nSay something cool',
              image: require('../../../assets/1.jpg'),
              imageStyle: styles.image,
              backgroundColor: '#59b2ab',
            },
            {
              id: 'somethun-dos',
              title: 'Title 2',
              text: 'Other cool stuff',
              image: require('../../../assets/2.jpg'),
              imageStyle: styles.image,
              backgroundColor: '#febe29',
            },
            {
              id: 'somethun1',
              title: 'Rocket guy',
              text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
              image: require('../../../assets/3.jpg'),
              imageStyle: styles.image,
              backgroundColor: '#22bcb5',
            }
          ];

    }

    goToSlide = (pageNum) => {
        this.setState({ activeIndex: pageNum });
        this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
      }
    
     
    onNextPress = ()=>{
        
        this.goToSlide(this.state.activeIndex + 1);

    }
    onDone = ()=>{
        //Navigate to new screen
        this.props.navigation.navigate("Login");
    }

    _onLayout = () => {
        const { width, height } = Dimensions.get('window');
        if (width !== this.state.width || height !== this.state.height) {
          // Set new width to update rendering of pages
          this.setState({ width, height });
          // Set new scroll position
          const func = () => { this.flatList.scrollToOffset({ offset: this.state.activeIndex * width, animated: false }) }
          Platform.OS === 'android' ? setTimeout(func, 0) : func();
        }
      }
      _onMomentumScrollEnd = (e)=>{
        const offset = e.nativeEvent.contentOffset.x;
        // Touching very very quickly and continuous brings about
        // a variation close to - but not quite - the width.
        // That's why we round the number.
        // Also, Android phones and their weird numbers
        const newIndex = Math.round(offset / this.state.width);
        if (newIndex === this.state.activeIndex) {
          // No page change, don't do anything
          this.goToSlide(newIndex);
          return;
        }
        
        const lastIndex = this.state.activeIndex;
        this.setState({ activeIndex: newIndex });
        this.goToSlide(newIndex);
      }
    _renderItem = (item)=>{
       
        const { width, height } = this.state;
        const bottomSpacer =  88 + (isIphoneX ? 34: 0) + 64;
        const _height = height - heightHeader*2;
        const props = { ...item.item, bottomSpacer, width, height:_height };

        return  <ItemSlider key={item.index} {...props} />;
    }
    
    render () {
        return (
            <View style={style_common.container}>
                <View style={styles.header}>
                    <Image
                        source={{uri:"https://s2.logaster.com/general/light/vi/logo1.png"}}
                        resizeMode="cover"
                        style={style_common.img_logo}
                    />
                    <View style={style_common.container}>
                        <Text style={styles.text_title}>AIBETRA là gì?</Text>
                    </View>
                    <View style={styles.language}></View>
                </View>
                <FlatList
                    ref={ref => this.flatList = ref}
                    data={this.slides}
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    extraData={this.state.width}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.id}
                    onLayout={this._onLayout}
                />
               {this._renderPagination()}
            </View>
        )
    }

    //Render common button for footer
    _renderButton = (name, onPress) => {
        
        return (
            
              <TouchableOpacity onPress={onPress} style={styles.btn_bottom}>
                <Text style={styles.text_btn}>{name}</Text>
              </TouchableOpacity>
              
          )
      }

    _renderNextButton = () => this._renderButton('Tiếp tục', this.onNextPress)
    _renderDoneButton = () => this._renderButton('Xong',  this.onDone)
    _renderPagination = ()=>{
        const isLastSlide = this.state.activeIndex === (this.slides.length - 1);
        const isFirstSlide = this.state.activeIndex === 0;
        const btn = isLastSlide ? this._renderDoneButton() : this._renderNextButton();

        return (
            <View style={styles.footer}>
              <View style={styles.paginationDots}>
                
                {this   .slides.length > 1 && this.slides.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === this.state.activeIndex ? styles.activeDotStyle : styles.dotStyle,
                    ]}
                  />
                ))}

              </View>
              {btn}
            </View>
          )
    }

    

}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'green',
        height:heightHeader,
        flexDirection:'row',
    },
    language:{
        width:50,
        margin:10,
        // backgroundColor:'red'
    
    },
    text_title:{
        
        textAlign:'center',
        width:'100%',
        height:50,
        fontSize:20,
        fontWeight:'bold',
        position:'absolute',
        bottom:0,
        // backgroundColor:'red'

    },
    footer:{
        backgroundColor:'green',
        height:heightHeader
    },
    image:{
        width: 150,
        height: 150,
    },
    btn_bottom:{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        padding:5,
        minWidth:100,
        position: 'absolute',
        right: 20,
        top:40,

    },
    text_btn:{
        textAlign:'center'
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
      },
      activeDotStyle:{
        backgroundColor: 'rgba(255, 255, 255, .9)'
      },
      dotStyle:{
        backgroundColor: 'rgba(0, 0, 0, .2)'
      }
})
export default GioiThieuAbetra