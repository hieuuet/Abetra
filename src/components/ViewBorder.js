import React from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";
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

/**
 *
 * custom for textinput border
 */
export const TextInputBorder = ({
  placeholder,
  onChangeText,
  returnKeyType = "next",
  my_style = {}
}) => {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, my_style]}
    />
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
  input: {
    borderWidth: 1,
    borderColor: COLOR.BORDER_INPUT,
    borderRadius: 5,
    padding: 5,
    alignSelf: "stretch"
  }
});
