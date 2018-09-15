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

    _.forEach(this.props.data, (tag) => {
      tag.select = false;
    });

    this.state = {
      data: this.props.data,
    };

    const widthTag = parseInt((width - 20) / this.props.numColumns);
    this.style_edit = {
      width: widthTag - 10,
      color: COLOR.COLOR_BLACK,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  onChangeItem = (textChange, index) => {
    if (this.tempData && this.tempData.length > 0) {
      this.tempData[index] = textChange;
    }
  };
  onPress = (index, tagSelected) => {
    if (this.props.selectable) {
      const currentState = this.props.data[index].select;
      const stateCoppy = [...this.state.data];
      stateCoppy[index].select = !currentState;
      this.setState({ data: stateCoppy });
    }
    this.props.onPressItemTag;
  };
  _renderItemTag = (itemTag) => {
    return (
      <View key={itemTag.index} style={styles.containerTag}>
        <TouchableOpacity
          onPress={() => this.onPress(itemTag.index, itemTag.item.hashtag)}
          style={itemTag.item.select ? styles.bg_select : styles.bg_unselect}
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
        data={this.state.data}
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
  selectable: PropTypes.bool.isRequired,
  numColumns: PropTypes.number,
};

HashTagEdit.defaultProps = {
  numColumns: 3,
  editable: false,
  selectable: false,
};

const styles = StyleSheet.create({
  containerTag: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  bg_unselect: {
    borderRadius: 25,
    backgroundColor: COLOR.COLOR_TAG,
    flexDirection: "row",
  },
  bg_select: {
    borderRadius: 25,
    backgroundColor: COLOR.COLOR_ORANGE,
    flexDirection: "row",
  },
});
