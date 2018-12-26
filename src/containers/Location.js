import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image
} from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import style_common from "../style-common";
import { IMAGE } from "../constant/assets";
import { LOCATION } from "../language";
import { connect } from "react-redux";
import { isEqual } from "lodash";

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

class Location extends Component {
  constructor(props) {
    super(props);
    this.LOCATION = LOCATION();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.LOCATION = LOCATION();
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../assets/location/map.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              marginTop: 10,
              height: 50,
              alignItems: "center",
              marginHorizontal: 20
            }}
          >
            <ImageBackground
              source={require("../../assets/location/searchlocation.png")}
              style={{ height: 50, width: "100%" }}
            >
              <View
                style={{ flex: 1, alignItems: "center", flexDirection: "row" }}
              >
                <Image
                  source={require("../../assets/location/search.png")}
                  style={{ height: 20, width: 20, marginLeft: 15 }}
                />
                <Text style={{ marginLeft: 15, fontSize: 14 }}>
                  {this.LOCATION.SearchLocation}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 5 }}>
            <View
              style={{
                marginTop: "20%",
                justifyContent: "space-between",
                marginHorizontal: "10%",
                flexDirection: "row"
              }}
            >
              <Image
                source={require("../../assets/location/location.png")}
                style={{ height: 35, width: (35 * 138) / 122, marginTop: 30 }}
              />
              <Image
                source={require("../../assets/location/location.png")}
                style={{ height: 35, width: (35 * 138) / 122 }}
              />
            </View>
            <View
              style={{
                marginTop: "5%",
                justifyContent: "space-between",
                marginHorizontal: "6%",
                flexDirection: "row"
              }}
            >
              <Image
                source={require("../../assets/location/location.png")}
                style={{ height: 35, width: (35 * 138) / 122, marginTop: 30 }}
              />
              <Image
                source={require("../../assets/location/stand.png")}
                style={{ height: 35, width: (35 * 87) / 133, marginTop: 30 }}
              />
              <Image
                source={require("../../assets/location/location.png")}
                style={{ height: 35, width: (35 * 138) / 122 }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              height: 50,
              alignItems: "center",
              marginHorizontal: 20
            }}
          >
            <ImageBackground
              source={require("../../assets/location/note.png")}
              style={{ height: 50, width: "100%" }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 14, color: "white" }}>
                  {this.LOCATION.AlertLocation}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 4 }} />
        </ImageBackground>

        {/*</Image>*/}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.loadUserProfile,
    currentLanguage: state.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return { dispatch };
};

Location = connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
export default Location;
