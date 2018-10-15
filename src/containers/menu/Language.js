import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ViewLoading, CustomizeHeader } from "../../components/CommonView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAllLanguage, getCurrentLanguage } from "../../actions";

class Language extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      allLanguage: []
    };
  }
  componentDidMount() {
    this.getLanguage();
  }

  getLanguage = async () => {
    this.setState({ isLoading: true });
    const allLanguage = await getAllLanguage().then(data => data.Value || []);
    this.setState({ isLoading: false, allLanguage });
  };

  _renderLoading = () => {
    return this.state.isLoading ? <ViewLoading /> : null;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CustomizeHeader
          label="Ngon ngu"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <FlatList />
        {this._renderLoading()}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {};
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
