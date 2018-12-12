/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import RadioForm from "../../../components/SimpleRadioButton";
import { IMAGE } from "../../../constant/assets";
import style_common from "../../../style-common";
import { GENDER_STATE } from "../../../constant/KeyConstant";
import PropTypes from "prop-types";
import { COLOR } from "../../../constant/Color";

class Gender extends Component {
  static propTypes = {
    TEXT_PROFILE: PropTypes.object.isRequired,
    dataUser: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      isShowCheckbox: false
    };
    this.initRadioData();
    this.currentGender = this.radioData[this.getGenderState()].label;
  }
  componentDidMount() {}

  initRadioData = () => {
    this.radioData = [
      {
        label:
          (this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Man) || "Man",
        value: GENDER_STATE.MAN
      },
      {
        label:
          (this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Women) || "Women",
        value: GENDER_STATE.WOMEN
      },
      {
        label:
          (this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Undefined) ||
          "Undefined",
        value: GENDER_STATE.OTHER
      }
    ];
  };

  findLabelFromValue = value => {
    const obj = this.radioData.find(item => item.value === value);
    if (obj) return obj.label;
    return "";
  };

  getGenderState = () => {
    if (
      typeof this.props.dataUser.Gender !== "number" ||
      (this.props.dataUser && !!this.props.dataUser.Gender === null)
    ) {
      return 2;
    }
    if (this.props.dataUser.Gender === GENDER_STATE.MAN) return 0;
    else return 1;
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text
          style={
            this.state.isShowCheckbox
              ? styles.label_radio_group_edit
              : styles.label_radio_group
          }
        >
          {(this.props.TEXT_PROFILE && this.props.TEXT_PROFILE.Gender) || ""}
        </Text>
        {this.state.isShowCheckbox ? (
          <RadioForm
            radio_props={this.radioData}
            initial={this.getGenderState()}
            formHorizontal={false}
            buttonColor={"gray"}
            selectedButtonColor={"#53A1CB"}
            buttonSize={5}
            animation={true}
            style={styles.radio_form}
            onPress={value => {
              this.currentGender = this.findLabelFromValue(value);
              this.setState({ isShowCheckbox: false });
              this.props.onSelect(value);
            }}
          />
        ) : (
          <Text style={{ flex: 1, color: COLOR.COLOR_BLACK }}>
            {this.currentGender}
          </Text>
        )}
        {!this.state.isShowCheckbox && (
          <TouchableOpacity
            onPress={() => {
              this.setState({ isShowCheckbox: true });
            }}
          >
            <Image
              source={IMAGE.btn_edit}
              resizeMode="cover"
              style={styles.iconedit}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
export default Gender;
const styles = StyleSheet.create({
  label_radio_group_edit: {
    width: 100,
    alignSelf: "flex-start",
    color: COLOR.COLOR_BLACK
  },
  label_radio_group: {
    width: 100,
    color: COLOR.COLOR_BLACK
  },
  radio_form: {
    flex: 1,
    alignItems: "flex-start"
  },
  iconedit: {
    width: 20,
    height: 20,
    marginTop: 5
  }
});
