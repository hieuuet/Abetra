import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { COLOR } from "../constant/Color";

/**
 *
 * custom for button border
 */
export const ButtonBorder = ({ lable, onPress, my_style = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, my_style]}>
      <Text style={styles.txt}>{lable}</Text>
    </TouchableOpacity>
  );
};

export const ViewLoading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={COLOR.BACKGROUND_BUTTON} />
    </View>
  );
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
    shadowColor: COLOR.BACKGROUND_BUTTON
  },
  txt: {
    color: COLOR.TEXT_BUTTON
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
    backgroundColor: "rgba(52, 52, 52, 0.5)"
  }
});
