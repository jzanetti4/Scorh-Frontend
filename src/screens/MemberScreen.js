import React from 'react';
import {ExpoConfigView} from '@expo/samples';

import {FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors} from "../const/colors";
import px2dp from "../utils/px2dp";
import {ListItem} from "react-native-elements";
import axios from "axios";
import {FINDALLUSERS, LISTALL} from "../const/requestURL";
import {defaultConfig} from "../const/config";

import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo



export default class MemberScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            parentId: null,
            username: null,
            isLoading: false
        }
    }

    componentWillMount() {
        this.loadingData()
    }

    async loadingData() {
        // this.setState({isRefreshing: true});
        setTimeout(() => {
            axios.get(FINDALLUSERS,
                defaultConfig
            )
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        data: response.data
                    })
                    // console.log("头部信息",response.headers)
                    const {userinfo} = response.headers
                    // console.log('用户信息',userinfo)
                    const userInfo = JSON.parse(userinfo)
                    // console.log('转化后info',userInfo)
                    this.setState({
                        userId: String(userInfo.id),
                        username: userInfo.username,

                    }, () => {
                        console.log("state更新完成")
                        this.setState({
                            isLoading: false
                        }, () => {
                            console.log("isLoading状态", this.state.isLoading)
                        })
                    })
                })
                .catch(error => {
                    if (error.response.status == 401) {
                        console.log(error.response.status)
                        this.props.navigation.navigate("Login")
                        this.setState({
                            isLoading: false
                        })
                    } else {
                        console.log(error)
                    }
                });
        }, 1000)
    }

    renderItem(item) {
        return (
            <TouchableOpacity
            >
                <View style={styles.cell_container}>

                    <ListItem
                        ViewComponent={LinearGradient}
                        Component={TouchableScale}
                        leftAvatar={{
                            title: item.username,
                            showEditButton: true,
                        }}
                        subtitle={item.role}
                        chevron
                    />
                </View>
            </TouchableOpacity>)
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => this.renderItem(item)}
                    extraData={this.state}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={colors.Blue}
                            colors={[colors.Blue]}
                            refreshing={this.state.isLoading}
                            onRefresh={this.loadingData.bind(this)}
                            tintColor={colors.Black}
                        />
                    }
                />
                {/*<Text>111</Text>*/}
            </View>
        )

    }
}







const styles = StyleSheet.create({

        input: {
            height: 50,
            borderWidth: 1,
            marginTop: 10,
            marginRight: 10,
            marginBottom: 10,
            borderColor: 'black',
            width: 250
        },
        container: {
            flex: 1,
            marginTop: px2dp(0),
            marginBottom: px2dp(0),
        },
        inputContainer: {
            borderWidth: 1,
            borderColor: '#eee',
            flexDirection: 'row',
            fontSize: px2dp(16),
            paddingLeft: px2dp(6),
            paddingRight: px2dp(6),
        },
        newInput: {
            flex: 7,
            borderColor: '#eee',
            fontSize: px2dp(16),
            padding: px2dp(10),
            minHeight: px2dp(50),
            maxHeight: px2dp(100),
            height: 'auto'
        },
        inputSubmitNo: {
            fontSize: px2dp(16),
            textAlignVertical: 'center',
            color: '#ddd'
        },
        inputSubmitYes: {
            fontSize: px2dp(16),
            textAlignVertical: 'center',
            color: '#1890ff'
        },
        tabs: {
            color: 'black',
        },
        tabItem: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            backgroundColor: '#fff',
        },
        infoDownText: {
            fontSize: px2dp(14),
            textAlignVertical: 'center',
            color: '#000',
            backgroundColor: '#fff',
        },
        infoUpText: {
            fontSize: px2dp(12),
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#999',
            backgroundColor: '#fff',
        },
        barDownText: {
            fontSize: px2dp(14),
            textAlignVertical: 'center',
            color: '#000',
        },
        barUpHeaderText: {
            fontSize: px2dp(12),
            textAlign: 'left',
            textAlignVertical: 'center',
            color: '#999',
        },
        cell_container: {
            backgroundColor: 'white',
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 2,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        row: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            fontSize: 16,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    })

