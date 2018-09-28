import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
  Image
} from "react-native";
import PropTypes from "prop-types";
import { COLOR } from "../constant/Color";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { IMAGE } from "../constant/assets";
const { width, height } = Dimensions.get("window");
// const isIphoneX =
//   Platform.OS === "ios" &&
//   !Platform.isPad &&
//   !Platform.isTVOS &&
//   (height === 812 || width === 812);
class ImageDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      width,
      height,
      activeIndex: this.props.currentIndex
    };
    this.data = this.props.navigation.getParam("data");
    this.currentIndex = this.props.navigation.getParam("currentIndex");
    if (this.currentIndex === -1) this.currentIndex = 0;
  }
  _onLayout = () => {
    const { width, height } = Dimensions.get("window");
    if (width !== this.state.width || height !== this.state.height) {
      // Set new width to update rendering of pages
      this.setState({ width, height });
      // Set new scroll position
      const func = () => {
        this.flatList.scrollToOffset({
          offset: this.state.activeIndex * width,
          animated: false
        });
      };
      Platform.OS === "android" ? setTimeout(func, 0) : func();
    }
  };
  _onMomentumScrollEnd = e => {
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

    this.setState({ activeIndex: newIndex });
    this.goToSlide(newIndex);
  };

  goToSlide = pageNum => {
    this.setState({ activeIndex: pageNum });
    this.flatList.scrollToOffset({ offset: pageNum * this.state.width });
  };

  onNextPress = () => {
    this.goToSlide(this.state.activeIndex + 1);
  };

  _renderItem = ({ item }) => {
    const imgUrl = item;

    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={typeof imgUrl === "string" ? { uri: imgUrl } : IMAGE.error}
          resizeMode={"contain"}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={this.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={ref => (this.flatList = ref)}
          initialScrollIndex={this.currentIndex}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          onLayout={this._onLayout}
        />
        <TouchableOpacity
          style={styles.close}
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon name="close" size={30} color={COLOR.COLOR_WHITE} />
        </TouchableOpacity>
      </View>
    );
  }
}
export default ImageDetail;

/**
 * Define props
 */
ImageDetail.propTypes = {
  data: PropTypes.array,
  currentIndex: PropTypes.number,
  navigation: PropTypes.object
};

/**
 * Default props if not set parameter
 **/
ImageDetail.defaultProps = {
  currentIndex: 0
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: COLOR.COLOR_BLACK
  },
  image: {
    width,
    height,
    flex: 1,
    alignSelf: "stretch"
  },
  close: {
    position: "absolute",
    top: 10,
    left: 10
  }
});
