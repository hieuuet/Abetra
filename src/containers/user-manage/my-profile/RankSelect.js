import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import { isEqual, cloneDeep } from "lodash";
import { IMAGE } from "../../../constant/assets";
import PropTypes from "prop-types";
import { COLOR } from "../../../constant/Color";

const widthScreen = Dimensions.get("window").width;
const withItemRank = 80;
class RankSelect extends Component {
  constructor(props) {
    super(props);

    const allRank = this.props.allRank.map(rank => ({
      ...rank,
      select: false
    }));
    this.state = {
      allRank
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.allRank, this.props.allRank)) {
      const allRank = nextProps.allRank.map(rank => ({
        ...rank,
        select: false
      }));
      this.setState({ allRank });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      isEqual(nextProps.allRank, this.props.allRank) &&
      isEqual(nextState, this.state)
    );
  }

  _renderItemRank = (numOfStar, rankItem) => {
    const star = [];
    for (let i = 0; i < numOfStar; i++) {
      star.push(<Image key={i} source={IMAGE.star} style={styles.icon_star} />);
    }
    return (
      <TouchableOpacity
        style={styles.wrapper_item}
        onPress={() => {
          const oldRank = cloneDeep(this.state.allRank);
          const newAllRank = oldRank.map(item => {
            if (item.ID === rankItem.ID) item.select = true;
            else item.select = false;
            return item;
          });

          this.setState({ allRank: newAllRank });
          this.props.onRankSelect(rankItem);
        }}
      >
        <ImageBackground
          style={styles.wrapper_item_img}
          imageStyle={styles.img_bg}
          source={rankItem && rankItem.select ? IMAGE.header : IMAGE.bg_gray}
        >
          <View style={styles.wrapper_star}>{star}</View>
          <Text
            style={
              rankItem && rankItem.select
                ? styles.text_active
                : styles.text_inactive
            }
          >
            {(rankItem && rankItem.ShortName) || ""}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  _renderRank = () => {
    //display 4 item on 1 row
    if ((widthScreen - 60) / 4 >= withItemRank)
      return (
        <View style={styles.wrapper_rank}>
          {this._renderItemRank(1, this.state.allRank[3])}
          {this._renderItemRank(2, this.state.allRank[2])}
          {this._renderItemRank(3, this.state.allRank[1])}
          {this._renderItemRank(4, this.state.allRank[0])}
        </View>
      );

    //else display 4 item on 2 row
    return (
      <View>
        <View style={styles.wrapper_rank}>
          {this._renderItemRank(1, this.state.allRank[3])}
          {this._renderItemRank(2, this.state.allRank[2])}
        </View>
        <View style={styles.wrapper_rank}>
          {this._renderItemRank(3, this.state.allRank[1])}
          {this._renderItemRank(4, this.state.allRank[0])}
        </View>
      </View>
    );
  };
  render() {
    return this._renderRank();
  }
}
export default RankSelect;

RankSelect.propsType = {
  allRank: PropTypes.array.isRequired,
  onRankSelect: PropTypes.func
};

const styles = StyleSheet.create({
  wrapper_rank: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  },
  wrapper_item: {
    width: withItemRank,
    height: 60,
    borderRadius: 5,
    margin: 5
  },
  wrapper_item_img: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  img_bg: { borderRadius: 5 },
  wrapper_star: { flexDirection: "row", alignItems: "center" },
  text_active: { color: COLOR.COLOR_WHITE, textAlign: "center" },
  text_inactive: { color: COLOR.COLOR_BLACK, textAlign: "center" },
  icon_star: { width: 20, height: 20 }
});
