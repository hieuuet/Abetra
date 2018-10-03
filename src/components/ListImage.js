/* Quyền lợi và chính sách hội viên */
import React, { Component } from "react";
import { Image, TouchableOpacity, FlatList, View } from "react-native";
import PropTypes from "prop-types";
class ListImage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const style_image = { width: "100%", height: 200 };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.imageArr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  this.props.navigation.navigate("ImageDetail", {
                    data: [item.item],
                    currentIndex: 0
                  })
                }
              >
                <Image
                  source={{ uri: item.item }}
                  resizeMode="cover"
                  style={style_image}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}
export default ListImage;
ListImage.propTypes = {
  imageArr: PropTypes.array.isRequired
};
