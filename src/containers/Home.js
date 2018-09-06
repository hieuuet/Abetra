import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

import StatusItems from "../components/StatusItems";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            ArrPost: [
                {
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                },
                {
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                },{
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                },
                {
                    FullName: "Nguyễn Văn Hiệu",
                    Content: "Không có gì quý hơn độc lập tự do",
                    Avt: "https://znews-photo-td.zadn.vn/w1024/Uploaded/unvjuas/2018_01_14/NGUYEN_BA_NGOC2312_ZING_2.jpg",
                    Time: '05/09/2018',
                    Img: "https://kenh14cdn.com/thumb_w/600/3qsvZHBxXH8xPdzaJmLFPEqgKxHka/Image/2015/03/10919541_326321127564559_1570986608_n-02055.jpg"
                }
            ]

        }
    }
    render () {
        const {navigation} = this.props
        return (
            <View style = {{flex:1}}>
                <FlatList
                    // refreshing={this.state.refresh}
                    // onRefresh={() => {
                    //     this.GetPost()
                    // }}
                    data = {this.state.ArrPost}
                    renderItem={(item) => {
                        return (
                            <StatusItems
                                dataItem={item}
                                // onReloadBack ={this.onReloadBack}
                                navigation={navigation}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}

                />
            </View>
        )
    }
}
export default Home