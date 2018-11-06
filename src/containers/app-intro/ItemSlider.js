import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
const { width, height } = Dimensions.get("window");
export default class ItemSlider extends React.PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    paddingTop: PropTypes.number,
    paddingBottom: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,

    titleStyle: PropTypes.object,
    imageStyle: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string
  };

  render() {
    return (
      <View style={styles.mainContent}>
        {/* <Text style={[styles.title, this.props.titleStyle]}>
          {this.props.title}
        </Text> */}
        <Image
          source={
            this.props.image.length === 0 ? "" : { uri: this.props.image }
          }
          resizeMode="cover"
          style={{ flex: 1, width, height }}
        />
        {/* <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    justifyContent: "center",
    flex: 1,
    // alignItems: "center"
    backgroundColor: "red"
  },
  text: {
    color: "rgba(255, 255, 255, .7)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "300",
    paddingHorizontal: 16
  },
  title: {
    fontSize: 26,
    color: "rgba(255, 255, 255, .7)",
    fontWeight: "300",
    paddingHorizontal: 16
  }
});
