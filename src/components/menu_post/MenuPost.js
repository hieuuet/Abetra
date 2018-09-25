import React, {Component} from "react";
import {
    View,
    Text,
    Modal,
    Alert,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon1 from "react-native-vector-icons/Feather";


export default class MenuPost extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {changeModalVisible, onChangeModalVisible} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={changeModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        // alignItems: 'center',
                        justifyContent: "flex-end",
                    }}
                >
                    <TouchableOpacity
                        style={{flex: 5}}
                        onPress={() => onChangeModalVisible(false)}
                    />
                    <View
                        style={{backgroundColor: "white", flex: 1, justifyContent: "center"}}
                    >
                        <TouchableOpacity onPress={() => onChangeModalVisible(false)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                <Icon1 name="bookmark" size={25} color="#E0E0E0"/>

                                <Text style={{marginLeft: 10}}>Lưu bài viết</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onChangeModalVisible(false)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10}}>
                                <Icon name="report-problem" size={25} color="#E0E0E0"/>
                                <Text style={{marginLeft: 10}}>Báo cáo sai phạm</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        );
    }
}
const DEVICE_WIDTH = Dimensions.get("window").width;
