import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { IMAGE } from "../constant/assets";
import PropTypes from "prop-types";
class BackgroundImage extends Component {
  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <Image
          source={this.props.isIntro ? IMAGE.background : IMAGE.background2}
          style={styles.backgroundImage}
        />
        {this.props.showBackIcon ? (
          <TouchableOpacity
            style={styles.btn_back}
            onPress={this.props.onBackPress}
          >
            <Image
              style={styles.img_back}
              resizeMode="cover"
              source={IMAGE.icon_back}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.children}
      </View>
    );
  }
}

BackgroundImage.propTypes = {
  onBackPress: PropTypes.func,
  showBackIcon: PropTypes.bool,
  style: PropTypes.number
};

BackgroundImage.defaultProps = {
  showBackIcon: true
};
export default BackgroundImage;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  backgroundImage: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    width: null,
    height: null,
    resizeMode: "cover"
  },
  img_back: {
    width: 35,
    height: 35 * (53 / 82)
  },
  btn_back: {
    alignSelf: "flex-start",
    padding: 10
  },
  back: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
