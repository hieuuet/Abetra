import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { ViewLoading, CustomizeHeader } from "../../components/CommonView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllLanguage, getCurrentLanguage } from "../../actions";
import { COLOR } from "../../constant/Color";
import { IMAGE } from "../../constant/assets";
import { LANGUAGE } from "../../constant/KeyConstant";
import { isEqual } from "lodash";
import { TEXT_LANGUAGE } from "../../language";

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return isEqual(nextProps, this.props);
  // }
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

  onClickLanguage = async index => {
    if (index === this.state.languageActive) return;
    this.setState({ languageActive: index });
    const lanSelected = this.state.allLanguage[index];
    await AsyncStorage.setItem(LANGUAGE, JSON.stringify(lanSelected));
    this.props.getCurrentLanguage();
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  _renderItem = item => {
    const index = item.index;
    item = item.item;

    return (
      <TouchableOpacity
        style={styles.parent}
        onPress={async () => await this.onClickLanguage(index)}
      >
        <Image
          resizeMode="contain"
          source={
            index === this.state.languageActive
              ? IMAGE.btn_active
              : IMAGE.btn_normal
          }
          style={styles.img_bg}
        />
        <View style={styles.wrapper_content}>
          <Text
            style={
              index === this.state.languageActive
                ? styles.text_active
                : styles.text_default
            }
          >
            {item.ShortName || ""}
          </Text>
          <Image
            resizeMode="cover"
            source={{ uri: item.Icon }}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log("render state", this.state);
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={TEXT_LANGUAGE().LanguageTitle}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.allLanguage}
          extraData={this.state}
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

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
    alignContent: "flex-end"
  },
  wrapper_content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 25
  },
  parent: {
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 50,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row"
  },
  img_bg: {
    flex: 1,
    height: 50
  },
  text_default: {
    marginLeft: 10,
    alignContent: "flex-start",
    flex: 1,
    color: COLOR.COLOR_BLACK
  },
  text_active: {
    marginLeft: 10,
    alignContent: "flex-start",
    flex: 1,
    color: COLOR.COLOR_WHITE
  }
});
