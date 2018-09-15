import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import HashTagEdit from "../../components/hashtag/HashTagEdit";
import { ButtonBorder } from "../../components/CommonView";
import style_common from "../../style-common";
import { COLOR } from "../../constant/Color";

class EditTags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))
      return false;
    return true;
  }

  onSubmitEditTag = () => {
    const latetestData = this.refs.hashTag.latetestData;
    this.props.data = latetestData;
    // this.setState({ editable: !this.state.editable });
  };
  onPressItemTag = () => {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_title}>
          <Text style={styles.text_title}>Lĩnh vực hoạt động</Text>
          <ButtonBorder
            my_style={[style_common.input_border, styles.btn_save]}
            text_style={styles.text_btn}
            label={this.state.editable ? "Lưu" : "Sửa"}
            onPress={() => {
              this.onSubmitEditTag();
            }}
          />
        </View>
        <HashTagEdit
          data={this.props.data}
          editable={this.state.editable}
          selectable
          onSubmitEdit={this.onSubmitEditTag}
          onPressItemTag={this.onPressItemTag}
          numColumns={2}
          ref="hashTag"
        />
      </View>
    );
  }
}

export default EditTags;

EditTags.propTypes = {
  data: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  container_title: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  btn_save: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    minWidth: 80,
    minHeight: 40,
    backgroundColor: COLOR.COLOR_GRAY,
    borderColor: COLOR.COLOR_GRAY,
  },
  text_btn: {
    color: COLOR.COLOR_BLACK,
  },
  text_title: {
    flex: 1,
    marginRight: 5,
    color: COLOR.COLOR_BLACK,
  },
});
