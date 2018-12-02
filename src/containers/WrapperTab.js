import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import TabHome from "../routers/TabHome";
import { COLOR } from "../constant/Color";
import { requestRegister } from "../actions";

import { isEqual } from "lodash";
import { TEXT_SEARCH } from "../language";

class WrapperTab extends Component {
  constructor(props) {
    super(props);
    this.TEXT_SEARCH = TEXT_SEARCH();
  }

  componentDidMount() {
    //listen backpress android and close alert
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_SEARCH = TEXT_SEARCH();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header_wrapper}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <ImageBackground
            style={styles.backgound_header}
            source={require("../../assets/wrappertab/bg_topbar.png")}
            // resizeMode="cover"
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={{
                  marginBottom: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 10
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Search")}
                  style={{
                    height: 25,
                    backgroundColor: "#2A9490",
                    flex: 1,
                    borderRadius: 25 / 2,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    name="search"
                    size={15}
                    color={COLOR.COLOR_BACKGROUND}
                    style={{ marginLeft: 10 }}
                  />
                  <Text
                    style={{
                      color: COLOR.COLOR_BACKGROUND,
                      marginLeft: 15,
                      fontWeight: "500"
                    }}
                  >
                    {this.TEXT_SEARCH.Search}
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    if (this.props.isGuest)
                      return requestRegister(this.props.navigation);
                    this.props.navigation.navigate("Message");
                  }}
                >
                  <Image
                    style={{
                      marginLeft: 15,
                      height: 19,
                      width: 19 * (69 / 53)
                    }}
                    source={require("../../assets/wrappertab/icon_mail.png")}
                    resizeMode="cover"
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </ImageBackground>
        </View>
        <TabHome screenProps={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    UserProfile: state.loadUserProfile,
    currentLanguage: state.currentLanguage,
    isGuest: state.loginGuest.isGuest
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

WrapperTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(WrapperTab);
export default WrapperTab;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header_wrapper: {
    height: 65,
    // backgroundColor: COLOR.COLOR_HEADER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  backgound_header: {
    height: 65,
    width: "100%"
  },
  backgound_search: {}
});
