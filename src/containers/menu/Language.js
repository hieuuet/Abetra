import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  AsyncStorage,
  BackHandler
} from "react-native";
import { ViewLoading, CustomizeHeader } from "../../components/CommonView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllLanguage, getCurrentLanguage } from "../../actions";
import { COLOR } from "../../constant/Color";
import { IMAGE } from "../../constant/assets";
import { LANGUAGE } from "../../constant/KeyConstant";
import { isEqual } from "lodash";
import { TEXT_MENU } from "../../language";
import AppContext from "../../AppContext";

class Language extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      allLanguage: [],
      languageActive: -1
    };

    this.TEXT_TITLE = TEXT_MENU().Language;
  }
  componentDidMount() {
    this.getLanguage();
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.context.isShowAlert) {
        this.context.hideAlert();
        return true;
      }
      this.props.navigation.goBack();
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.currentLanguage, nextProps.currentLanguage)) {
      this.TEXT_TITLE = TEXT_MENU().Language;
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
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

  onClickLanguage = async index => {
    if (index === this.state.languageActive) return;
    this.setState({ languageActive: index });
    const lanSelected = this.state.allLanguage[index];
    await AsyncStorage.setItem(LANGUAGE, JSON.stringify(lanSelected));
    this.props.getCurrentLanguage();
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading MarginTop={75} /> : null;
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
          resizeMode="stretch"
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

  _bindeGlobalContext = () => {
    return (
      <AppContext.Consumer>
        {context => {
          this.context = context;
        }}
      </AppContext.Consumer>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label={this.TEXT_TITLE}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <FlatList
          data={this.state.allLanguage}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        {this._renderLoading()}
        {this._bindeGlobalContext()}
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
    width: 30,
    height: 30 * (112 / 79),
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
