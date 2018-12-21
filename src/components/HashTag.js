import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { connect } from "react-redux";
import CheckBox from "./CheckBox ";
import { API } from "../constant/api";
import { isEqual } from "lodash";
import PropTypes from "prop-types";
import { TEXT_POLL_VOTE } from "../language";
import { compose } from "redux";
import injectShowAlert from "../constant/injectShowAlert";
import Icon from "react-native-vector-icons/dist/Feather";

class HashTag extends Component {
    static propTypes = {};
    constructor(props) {
        super(props);
    }



    render() {
        const { item } = this.props.dataItemHashTag;
        // console.log('itempollvote', item)
        return (
            <View style={styles.borderHashtag}>
                <Text>#{item.key}</Text>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        UserProfile: state.loadUserProfile,
        currentLanguage: state.currentLanguage
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};

HashTag = connect(
    mapStateToProps,
    mapDispatchToProps
)(HashTag);
export default compose(injectShowAlert)(HashTag);
const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
    borderHashtag: {
        height: 30,
        width: DEVICE_WIDTH / 3 - 20,
        marginLeft: 15,
        backgroundColor: '#B8B8B8',
        borderColor: "#B8B8B8",
        borderWidth: 1,
        borderRadius: 15,
        justifyContent:  'center',
        alignItems: 'center'

    }
})
