import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StatusBar,
  Alert
} from "react-native";
import { COLOR } from "../constant/Color";
import { IMAGE } from "../constant/assets";
import style_common from "../style-common";
import PropTypes from "prop-types";
import { TEXT_ALERT } from "../language";
/**
 * Common alert:
 * Param:
 *  title, message,
 * positive: { text_positive, action_positive },
  negative: { text_negative, action_negative }
 */

export const showAlert = ({ title, message, positive, negative }) => {
  return Alert.alert(
    title || TEXT_ALERT().NotiTitle,
    message || TEXT_ALERT().NotiMessage,
    [
      {
        text: (positive && positive.text_positive) || TEXT_ALERT().TextPositive,
        onPress: (positive && positive.action_positive) || (() => {})
      },
      negative && {
        text: negative.text_negative || TEXT_ALERT().TextNegative,
        onPress: negative.action_negative || (() => {})
      }
    ],
    { cancelable: false }
  );
};

/**
 *
 * custom for button border
 */

const DismissKeyboardHOC = Comp => {
  const ButtonBorder = ({
    label = "",
    onPress,
    my_style = {},
    text_style = {}
  }) => (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      accessible={false}
      style={[styles.btn, my_style]}
    >
      <Comp>
        <Text style={[styles.txt, text_style]}>{label}</Text>
      </Comp>
    </TouchableOpacity>
  );
  ButtonBorder.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    my_style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    text_style: PropTypes.number
  };
  return ButtonBorder;
};

export const ButtonBorder = DismissKeyboardHOC(View);

/**
 *Viewloading for app
 * @param {using default loading for facebook} isLoadingIndicator
 */
export const ViewLoading = ({ isLoadingIndicator = true, MarginTop = -10 }) => {
  return (
    <View style={[styles.loading, { marginTop: MarginTop }]}>
      {isLoadingIndicator ? (
        <ActivityIndicator size="large" color={COLOR.BACKGROUND_BUTTON} />
      ) : null}
    </View>
  );
};
ViewLoading.propTypes = {
  isLoadingIndicator: PropTypes.bool,
  MarginTop: PropTypes.number
};

/**
 * Buton for each tab
 */
export const TabView = ({
  label = "",
  onPress,
  isActive = false,
  style = {}
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        isActive
          ? [style_common.card_view, style_common.btn_tab_active]
          : style_common.btn_tab_inActive,
        style
      ]}
    >
      <Text
        style={isActive ? styles.text_tab_active : styles.text_tab_inactive}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
TabView.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  style: PropTypes.number
};

/**
 * Buton for each tab type 2
 */
export const TabView2 = ({
  label = "",
  onPress,
  isActive = false,
  style = {}
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <Text
        style={isActive ? styles.text_tab_active2 : styles.text_tab_inactive2}
      >
        {label.toUpperCase()}
      </Text>
      <View style={isActive ? styles.view_active2 : styles.view_inactive2} />
    </TouchableOpacity>
  );
};
TabView2.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  style: PropTypes.number
};
/**
 * Header search view
 */
export const SearchView = ({ onPress, style = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.container_search, style_common.card_view, style]}
      onPress={onPress}
    >
      <Image
        source={IMAGE.search_icon}
        style={styles.search}
        resizeMode="cover"
      />
      <Text style={styles.text_search}>Tìm kiếm</Text>
    </TouchableOpacity>
  );
};
SearchView.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.number
};

/**
 * Scrollview listen onEndReach
 */
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 5;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export class MyCoolScrollViewComponent extends Component {
  render() {
    return (
      <ScrollView
        style={style_common.container}
        contentContainerStyle={styles.scroll_view}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            this.props.onEndReached();
          }
        }}
        scrollEventThrottle={400}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}

MyCoolScrollViewComponent.propTypes = {
  onEndReached: PropTypes.func
};

/**
 * Customize header
 */

export class CustomizeHeader extends Component {
  render() {
    return (
      <View style={styles.header_wrapper}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Image
          style={styles.backgound_header}
          source={IMAGE.header}
          resizeMode="cover"
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
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
          <Text style={styles.txt_header}>{this.props.label || ""}</Text>
        </View>
      </View>
    );
  }
}

CustomizeHeader.propTypes = {
  onBackPress: PropTypes.func,
  label: PropTypes.string
};

/**
 * Button image backgroun cornor
 */
export class ButtonBackGround extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.parrent_btn, this.props.btn_style]}
        onPress={this.props.onPress}
      >
        <Image
          resizeMode="stretch"
          source={this.props.source}
          style={styles.img_bg}
        />
        <View style={styles.wrapper_content}>
          <Text style={[styles.text_default, this.props.text_style]}>
            {this.props.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ButtonBackGround.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string.isRequired,
  btn_style: PropTypes.number,
  text_style: PropTypes.number,
  source: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  parrent_btn: {
    borderRadius: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 150,
    flexDirection: "row"
  },
  btn: {
    borderRadius: 20,
    padding: 5,
    minWidth: 140,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBE00",
    marginTop: 10
  },
  img_bg: {
    flex: 1,
    height: 40,
    borderRadius: 40
  },
  wrapper_content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 25
  },
  text_default: {
    flex: 1,
    textAlign: "center",
    color: COLOR.COLOR_WHITE
  },
  txt: {
    color: COLOR.TEXT_BUTTON
    // textAlign: "center",
    // alignSelf: "center",
    // alignContent: "center"
  },
  loading: {
    top: -10,
    bottom: -10,
    left: -10,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "rgba(52, 52, 52, 0.5)"
  },
  scroll_view: { flexGrow: 1 },
  container_search: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 40,
    margin: 10,
    backgroundColor: COLOR.COLOR_GRAY
  },
  text_search: {
    marginLeft: 10
  },
  search: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  text_tab_active: {
    color: COLOR.COLOR_TEXT_BLUE,
    fontWeight: "bold",
    textAlign: "center"
  },
  text_tab_inactive: {
    color: COLOR.COLOR_WHITE,
    fontWeight: "bold",
    textAlign: "center"
  },
  text_tab_active2: {
    color: COLOR.COLOR_TEXT_BLUE,
    fontWeight: "bold",
    marginBottom:10,
    marginTop:10,
    textAlign: "center"
  },
  text_tab_inactive2: {
    color: COLOR.BORDER_INPUT,
    fontWeight: "bold",
    marginBottom:10,
    marginTop:10,
    textAlign: "center"
  },
  view_active2: {
    backgroundColor: "#53A1CB",
    height: 2,
    alignContent: "flex-end"
  },
  view_inactive2: {
    backgroundColor: "#9e9e9e",
    height: 1,
    alignContent: "flex-end"
  },
  btn_back: {
    alignSelf: "flex-start",
    padding: 10
  },
  back: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10
  },
  img_back: {
    width: 30,
    height: 30 * (53 / 82)
  },
  header_wrapper: {
    height: 65,
    // backgroundColor: COLOR.COLOR_HEADER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  txt_header: {
    color: COLOR.COLOR_BACKGROUND,
    fontSize: 16,
    flex: 1,
    marginRight: 35 + 10,
    textAlign: "center"
  },
  backgound_header: {
    flex: 1,
    height: 65,
    position: "absolute"
  }
});
