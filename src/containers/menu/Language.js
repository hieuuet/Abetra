import React, { Component } from "react";
import { View, FlatList, Image, TouchableOpacity, Text } from "react-native";
import { ViewLoading, CustomizeHeader } from "../../components/CommonView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllLanguage, getCurrentLanguage } from "../../actions";
import { COLOR } from "../../constant/Color";
import { IMAGE } from "../../constant/assets";

class Language extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      allLanguage: [],
      languageActive: -1
    };
  }
  componentDidMount() {
    this.getLanguage();
  }

  getLanguage = async () => {
    this.setState({ isLoading: true });
    const allLanguage = await getAllLanguage().then(data => data.Value || []);
    const lanActiveIndex = allLanguage.findIndex(
      lan => lan.Code === this.props.currentLanguage.Code
    );
    this.setState({
      isLoading: false,
      allLanguage,
      languageActive: lanActiveIndex
    });
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderItem = item => {
    const index = item.index;
    item = item.item;

    return (
      <TouchableOpacity
        style={{
          borderRadius: 25,
          flex: 1,
          marginHorizontal: 50,
          minHeight: 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 10
        }}
      >
        <Image
          resizeMode="cover"
          source={
            index === this.state.languageActive
              ? IMAGE.btn_active
              : IMAGE.btn_normal
          }
          style={{
            borderRadius: 25,
            flex: 1,
            height: 50
          }}
        />
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            borderRadius: 25
          }}
        >
          <Text style={{ marginLeft: 20, alignContent: "flex-start", flex: 1 }}>
            {item.ShortName || ""}
          </Text>
          <Image
            resizeMode="cover"
            source={{ uri: item.Icon }}
            style={{
              width: 35,
              height: 35,
              marginRight: 10,
              alignContent: "flex-end"
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("---", this.state);
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label="Ngon ngu"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.allLanguage}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {this._renderLoading()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentLanguage: state.currentLanguage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllLanguage: bindActionCreators(getAllLanguage, dispatch),
    getCurrentLanguage: bindActionCreators(getCurrentLanguage, dispatch)
  };
};

Language = connect(
  mapStateToProps,
  mapDispatchToProps
)(Language);
export default Language;
