import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { IMAGE } from "../constant/assets";

export default class BackgroundImage extends Component {
  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        <Image
          source={this.props.isIntro ? IMAGE.background : IMAGE.background2}
          style={styles.backgroundImage}
        />
        {this.props.children}
      </View>
    );
  }
}
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
  }
});
