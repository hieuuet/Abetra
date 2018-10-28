import React, { Component } from "react";
import {
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text
} from "react-native";
const { width } = Dimensions.get("window");
import PropTypes from "prop-types";
import { COLOR } from "../../constant/Color";
import { isEqual, cloneDeep } from "lodash";
export default class HashTagEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
    };

    const widthTag = parseInt((width - 20) / this.props.numColumns);
    this.style_edit = {
      color: COLOR.COLOR_BLACK,
      width: widthTag - 10,
      textAlign: "center"
    };
    this.style_edit_selected = {
      color: COLOR.COLOR_WHITE,
      width: widthTag - 10,
      textAlign: "center"
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  onChangeItem = (textChange, index) => {};
  onPress = (index, tagSelected) => {
    if (this.props.selectable) {
      const currentState = this.state.data[index].select;
      const stateCoppy = cloneDeep(this.state.data);
      stateCoppy[index].select = !currentState;
      this.setState({ data: stateCoppy });
      this.props.onDataSelected(stateCoppy);
    }
    this.props.onPressItemTag;
  };
  _renderItemTag = itemTag => {
    return (
      <View
        key={itemTag.index}
        style={
          (itemTag.item.select && this.props.selectable) ||
          !this.props.selectable
            ? styles.bg_select
            : styles.bg_unselect
        }
      >
        <TouchableOpacity
          onPress={() =>
            this.props.selectable &&
            this.onPress(itemTag.index, itemTag.item.hashtag)
          }
        >
          <Text
            style={
              itemTag.item.select ? this.style_edit_selected : this.style_edit
            }
          >
            {itemTag.item.hashtag}
          </Text>
          {/* <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            returnKeyType="done"
            multiline={true}
            editable={this.props.editable}
            defaultValue={itemTag.item.hashtag}
            onChangeText={this.onChangeItem}
            style={this.style_edit}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    console.log("render list tag");
    return (
      <View>
        <FlatList
          data={this.state.data}
          numColumns={this.props.numColumns}
          snapToAlignment={"center"}
          renderItem={this._renderItemTag}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
HashTagEdit.propTypes = {
  data: PropTypes.array.isRequired,
  onPressItemTag: PropTypes.func,
  editable: PropTypes.bool.isRequired,
  selectable: PropTypes.bool.isRequired,
  numColumns: PropTypes.number,
  onDataSelected: PropTypes.func
};

HashTagEdit.defaultProps = {
  numColumns: 3,
  editable: false,
  selectable: false
};

const styles = StyleSheet.create({
  containerTag: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  bg_unselect: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 25,
    backgroundColor: COLOR.COLOR_TAG,
    minHeight: 40
  },
  bg_select: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 25,
    backgroundColor: COLOR.COLOR_TAG_SELECT,
    minHeight: 40
  }
});
