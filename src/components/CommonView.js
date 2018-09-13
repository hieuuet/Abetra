import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLOR } from "../constant/Color";
import { IMAGE } from "../constant/assets";
import style_common from "../style-common";
import PropTypes from "prop-types";
/**
 *
 * custom for button border
 */
export const ButtonBorder = ({
  label = "",
  onPress,
  my_style = {},
  text_style = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, my_style]}>
      <Text style={[styles.txt, text_style]}>{label}</Text>
    </TouchableOpacity>
  );
};
ButtonBorder.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  my_style: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  text_style: PropTypes.number,
};

/**
 *Viewloading for app
 * @param {using default loading for facebook} isLoadingIndicator
 */
export const ViewLoading = (isLoadingIndicator = true) => {
  return (
    <View style={styles.loading}>
      {isLoadingIndicator.isLoadingIndicator ? (
        <ActivityIndicator size="large" color={COLOR.BACKGROUND_BUTTON} />
      ) : null}
    </View>
  );
};

/**
 * Buton for each tab
 */
export const TabView = ({
  label = "",
  onPress,
  isActive = false,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        isActive ? style_common.btn_tab_active : style_common.btn_tab_inActive,
        style,
      ]}
    >
      <Text style={styles.text_tab}>{label}</Text>
    </TouchableOpacity>
  );
};
TabView.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  style: PropTypes.number,
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
  style: PropTypes.number,
};
const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: COLOR.BACKGROUND_BUTTON,
    backgroundColor: COLOR.BACKGROUND_BUTTON,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    minWidth: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    marginTop: 10,
    shadowColor: COLOR.BACKGROUND_BUTTON,
  },
  txt: {
    color: COLOR.TEXT_BUTTON,
  },
  loading: {
    top: -10,
    bottom: -10,
    left: -10,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
  },
  container_search: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: 40,
    margin: 10,
    backgroundColor: COLOR.COLOR_GRAY,
  },
  text_search: {
    marginLeft: 10,
  },
  search: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  text_tab: {
    color: COLOR.COLOR_BLACK,
    fontWeight: "bold",
    textAlign: "center",
  },
});
