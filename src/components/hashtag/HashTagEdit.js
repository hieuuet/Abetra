import React, { Component } from "react";
import {
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
const { width } = Dimensions.get("window");
import PropTypes from "prop-types";
import { COLOR } from "../../constant/Color";
import _ from "lodash";
export default class HashTagEdit extends Component {
  constructor(props) {
    super(props);

    const widthTag = parseInt((width - 20) / this.props.numColumns);
    this.style_edit = {
      width: widthTag - 10,
      color: COLOR.COLOR_BLACK,
    };

    this.latetestData = this.props.data;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(nextProps, this.props)) return false;
    return true;
  }
  onChangeItem = (textChange, index) => {
    if (this.tempData && this.tempData.length > 0) {
      this.tempData[index] = textChange;
    }
  };

  _renderItemTag = (itemTag) => {
    // console.log("render item", itemTag);
    return (
      <View key={itemTag.index} style={styles.containerTag}>
        <TouchableOpacity
          onPress={this.props.onPressItemTag}
          style={styles.bg_btn}
        >
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType="done"
            multiline={true}
            // autoFocus={this.props.editable && itemTag.index === 0}
            editable={this.props.editable}
            defaultValue={itemTag.item.hashtag}
            onChangeText={this.onChangeItem}
            style={this.style_edit}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    console.log("render flatlist tag");
    return (
      <FlatList
        data={this.props.data}
        numColumns={this.props.numColumns}
        snapToAlignment={"center"}
        renderItem={this._renderItemTag}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
HashTagEdit.propTypes = {
  data: PropTypes.array.isRequired,
  onPressItemTag: PropTypes.func,
  editable: PropTypes.bool.isRequired,
  numColumns: PropTypes.number,
};

HashTagEdit.defaultProps = {
  numColumns: 3,
  editable: false,
};

const styles = StyleSheet.create({
  containerTag: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  bg_btn: {
    borderRadius: 25,
    backgroundColor: COLOR.COLOR_TAG,
    flexDirection: "row",
  },
});
