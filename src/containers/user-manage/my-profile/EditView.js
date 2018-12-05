import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { COLOR } from "../../../constant/Color";
import { isEqual } from "lodash";
import { IMAGE } from "../../../constant/assets";

class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowEdit: false
    };
    this.currentText = this.props.text_edit;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.text_edit !== this.currentText)
      this.currentText = nextProps.text_edit;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.text_edit, this.props.text_edit) &&
      isEqual(nextState, this.state)
    );
  }
  componentDidUpdate() {
    if (this.refs.input) this.refs.input.focus();
  }
  render() {
    console.log("render edit");
    return (
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="never">
        <View style={styles.wrapper}>
          {this.props.label ? (
            <Text style={[styles.label, this.props.style_label]}>
              {this.props.label}
            </Text>
          ) : null}
          {!this.state.allowEdit ? (
            <Text
              style={[styles.edit, this.props.style_edit]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {this.currentText}
            </Text>
          ) : (
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="done"
              keyboardType={this.props.keyboardType}
              ref="input"
              numberOfLines={1}
              placeholder={this.props.placeHolder}
              editable={this.state.allowEdit}
              defaultValue={this.currentText}
              onChangeText={text => {
                this.currentText = text;
                if (this.props.onChangeText) this.props.onChangeText(text);
              }}
              style={[styles.edit, this.props.style_edit]}
              onBlur={event => {
                console.log("on bluer", event);
                this.setState({ allowEdit: false });

                this.props.onSubmit(this.currentText);
              }}
            />
          )}
          {this.props.isEditAble ? (
            <TouchableOpacity
              onPress={
                this.props.onPress ||
                (() => {
                  this.setState({ allowEdit: !this.state.allowEdit });
                })
              }
            >
              <Image
                source={
                  this.props.type === 1 ? IMAGE.btn_edit1 : IMAGE.btn_edit
                }
                resizeMode="cover"
                style={
                  this.props.type === 1 ? styles.iconedit1 : styles.iconedit
                }
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}
export default EditView;

/**
 * Define props
 */
EditView.propTypes = {
  label: PropTypes.string,
  type: PropTypes.number,
  text_edit: PropTypes.string.isRequired,
  isEditAble: PropTypes.bool,
  style_label: PropTypes.number,
  style_edit: PropTypes.number,
  onChangeText: PropTypes.func,
  onSubmit: PropTypes.func,
  placeHolder: PropTypes.string,
  keyboardType: PropTypes.string,
  onPress: PropTypes.func || PropTypes.number
};

/**
 * Default props if not set parameter
 **/
EditView.defaultProps = {
  isEditAble: false,
  placeHolder: "",
  keyboardType: "default"
};
const styles = StyleSheet.create({
  iconedit1: {
    width: 20,
    height: 20
  },
  iconedit: {
    width: 20,
    height: 20 ,
    marginTop:5
  },
  wrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  label: {
    minWidth: 100,
    color: COLOR.COLOR_BLACK
  },
  edit: {
    color: COLOR.COLOR_BLACK,
    justifyContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    margin: 1,
    flex: 1
    // height: 40,
  }
});
