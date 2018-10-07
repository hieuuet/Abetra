import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from "react-native";
import { USER_ID } from "../../constant/KeyConstant";
import { IMAGE } from "../../constant/assets";
import { formatDate } from "../../constant/UtilsFunction";

export default class AccountItem extends Component {
  constructor(props) {
    super(props);
    this.myUserID = AsyncStorage.getItem(USER_ID);
  }

  onClickAccount = () => {
    const { item } = this.props.dataItem;
    if (!item) return;
    if (this.myUserID && item.UserID === this.myUserID) {
      return this.props.navigation.navigate("Profile");
    }
    this.props.navigation.navigate("MemberProfile", { item });
  };

  render() {
    const { item } = this.props.dataItem;

    return (
      <TouchableOpacity onPress={this.onClickAccount}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Image
            style={styles.image_avt}
            source={
              item.Avatar
                ? {
                  uri: item.Avatar
                }
                : IMAGE.logo
            }
            resizeMode="cover"
          />
          <View
            style={{
              flex: 4,
              flexDirection: "column",
              marginLeft: 10,
              marginTop: 10,
              marginBottom: 10,
              justifyContent: "center"
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontWeight: "600" }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
              >
                {item.FullName}
              </Text>
              <Text>{formatDate(item.CreatedTime)}</Text>
            </View>
            <Text style={{}} numberOfLines={1} ellipsizeMode={"tail"}>
              {item.Content}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            marginLeft: DEVICE_WIDTH / 8,
            backgroundColor: "#E0E0E0"
          }}
        />
      </TouchableOpacity>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  image_avt: {
    height: DEVICE_WIDTH / 8,
    width: DEVICE_WIDTH / 8,
    borderRadius: DEVICE_WIDTH / 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 1
  }
});
