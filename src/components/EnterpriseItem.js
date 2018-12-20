import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

import IconMore from "react-native-vector-icons/Ionicons";

// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import style_common from "../style-common";
import { IMAGE } from "../constant/assets";
import { URL_BASE } from "../constant/api";
import { COLOR } from "../constant/Color";
import { getRank } from "../constant/UtilsFunction";
import { TEXT_INTERPRISE } from "../language";

class EnterpriseItem extends Component {
  constructor(props) {
    super(props);

    this.TEXT_INTERPRISE = TEXT_INTERPRISE();
  }
  componentDidMount() {}

  _onClickItem = () => {
    const { item } = this.props.dataItem;
    if (!item) return;
    if (this.props.userID && item.UserID === this.props.userID) {
      return this.props.screenProps.navigate("Profile");
    }
    this.props.screenProps.navigate("MemberProfile", { item });
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  parseHashTag = arrHashTag => {
    if (!arrHashTag || arrHashTag.length === 0) return;
    let temp = [];
    temp = JSON.parse(arrHashTag);
    if (!Array.isArray(temp)) return;
    let arrName = "";
    this.props.allHashTag
      .filter(item => temp.includes(item.CatID))
      .forEach(item => {
        arrName += ` #${item.Name}`;
      });
    return arrName;
  };

  render() {
    const { item } = this.props.dataItem;
    const rank = getRank(item.PackgeID, this.props.allRank);

    return (
      <TouchableOpacity style={styles.parent} onPress={this._onClickItem}>
        <Image
          style={styles.image_circle}
          source={
            item && item.Avatar
              ? { uri: URL_BASE + item.Avatar }
              : IMAGE.avatar_default
          }
          resizeMode="cover"
        />

        <View style={styles.wrapper_right}>
          <View style={styles.header}>
            <Text style={styles.text_name}>{item.NameEnterprise || "_"}</Text>
            {/* <TouchableOpacity
              onPress={() => {
                this.props.onClickShowModal(item);
              }}
            >
              <IconMore
                name="ios-more"
                size={25}
                color="black"
                style={styles.icon_more}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.wrapper_rank}>
            <Text style={styles.text_rank}>
              {(rank && rank.RankName) || ""}
            </Text>
            <Image
              source={{ uri: rank && rank.Icon2 }}
              resizeMode="cover"
              style={styles.img_rank_thumb}
            />
          </View>
          <Text style={style_common.text_color_base}>
            {item.Description || ""}
          </Text>
          <Text style={style_common.text_color_base}>
            {this.TEXT_INTERPRISE.Address}: {item.Address || ""}
          </Text>
          <Text style={styles.text_tag}>
            {this.parseHashTag(item.HashTag) || ""}
          </Text>
        </View>
        <View style={styles.line_end} />
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = state => {
  return {
    allRank: state.allRank,
    allHashTag: state.allHashTag
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

EnterpriseItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseItem);

export default EnterpriseItem;
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  wrapper_rank: { flexDirection: "row", alignItems: "center" },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  parent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  header: { flexDirection: "row" },
  image_circle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10
  },
  wrapper_right: {
    flexDirection: "column",
    flex: 1,
    marginBottom: 5
  },
  icon_more: {
    marginRight: 10,
    marginLeft: 10
  },
  text_name: {
    color: COLOR.COLOR_BLACK,
    fontWeight: "800",
    flex: 1
  },
  text_rank: {
    fontWeight: "bold",
    color: COLOR.COLOR_BLACK,
    marginRight: 5
  },
  text_tag: {
    fontWeight: "bold",
    color: COLOR.COLOR_BLACK
  },
  imagePost: {
    width: DEVICE_WIDTH,
    height: 250,
    marginTop: 10
  },
  line_end: {
    height: 1,
    backgroundColor: "#cccccc",
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10
  },
  img_rank_thumb: {
    width: 15,
    height: 15
  }
});
