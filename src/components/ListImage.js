/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { ScrollView, Image, TouchableOpacity, View, Text } from "react-native";
import PropTypes from "prop-types";

// import { COLOR } from "../constant/Color";
// import { getBenifet } from "../actions";
// import { ViewLoading } from "../components/CommonView";
class ListImage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const style_image = { width: "100%", height: 200 };
    const temp = this.props.imageArr.slice(0, this.props.imageArr.length);
    const allImage = [];
    temp.forEach((item, index) => {
      allImage.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() =>
            this.props.navigation.navigate("ImageDetail", {
              data: [item],
              currentIndex: 0
            })
          }
        >
          <Image
            key={index}
            source={{ uri: item }}
            resizeMode="cover"
            style={style_image}
          />
        </TouchableOpacity>
      );
    });

    return <ScrollView style={{ flex: 1 }}>{allImage}</ScrollView>;
  }
}
export default ListImage;
ListImage.propTypes = {
  imageArr: PropTypes.array.isRequired
};
