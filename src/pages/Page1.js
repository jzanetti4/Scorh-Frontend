import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    FlatList, Image, Alert, RefreshControl
} from 'react-native';

import
{
    ActionSheet,
    ActivityIndicator,
    Button,
    Card,
    Flex,
    Tabs,
    WhiteSpace,
    WingBlank,
} from '@ant-design/react-native';

import {colors} from '../const/colors'
import {Avatar, Divider, ListItem, Icon} from 'react-native-elements'
import px2dp from "../utils/px2dp";
import API from "../http/axiosRequest";

import {APPENDPOST, LISTALL, NEWPOST} from "../const/requestURL";
import List from "@ant-design/react-native/es/list";
import  axios from 'axios'
import {defaultConfig} from "../const/config";
import {isLoading} from "expo-font";

const {width, height} = Dimensions.get('window');


let a = 0
export default class Page1 extends React.Component {
    //也可在这里定义每个页面的导航属性，这里的定义会覆盖掉别处的定义
    // static navigationOptions = {
    //     title: 'Page1',
    // };


//     constructor(props) {
//         super(props);
//         this.sendGetRequest = this.sendGetRequest.bind(this)
//         this.sendPostRequest = this.sendPostRequest.bind(this)
//     }
//
//     sendGetRequest() {
//         const api = new API()
//         //检测最新版本
//         api.send({method: 'GET', url: "/test"}, (res) => {
//                 console.log(res)
//             }
//         );
//     }
//
//     sendPostRequest() {
//         const api = new API()
//         //检测最新版本
//         const object =
//             {
//                 age: "12",
//                 name: "yhq"
//             }
//
//         api.send({method: 'POST', url: "/post", obj:object}, (res) => {
//                 console.log(res)
//             }
//         );
//
//
//     }
//
//     render() {
//         const {navigation} = this.props;
//         return <View style={{flex: 1, marginTop: 30}}>
//             <Text style={styles.text}>欢迎来到Page1</Text>
//             <Button
//                 title="Go Back"
//                 onPress={() => {
//                     navigation.goBack();
//                 }}
//             />
//             <Button
//                 title="改变主题色"
//                 onPress={() => {
//                     navigation.setParams({
//                         theme: {
//                             tintColor: 'orange',
//                             updateTime: new Date().getTime()
//                         }
//                     })
//                 }}
//             />
//             <Button
//                 title="跳转到页面4"
//                 onPress={() => {
//                     navigation.navigate("Signup")
//                 }}
//             />
//
//
//             <Button
//                 title="发送get请求"
//                 onPress={this.sendGetRequest
//                 }
//             />
//
//             <Button
//                 title="发送Post请求"
//                 onPress={this.sendPostRequest
//                 }
//             />
//         </View>
//     }


    constructor(props) {
        super(props)
        const {navigation} = this.props;
        this.state = {
            parentId:null,
            username:null,
            userId: null,
            type:"post",
            content: null,
            childContent:null,
            displayChildPost: false,
            isLoading:false
        }
    }


    async loadingData(){
        // this.setState({isRefreshing: true});
        setTimeout(() => {
            axios.get(LISTALL,
                defaultConfig
            )
                .then(response => {
                    this.setState({
                        data:response.data
                    })
                    // console.log("头部信息",response.headers)
                    const {userinfo}=response.headers
                    // console.log('用户信息',userinfo)
                    const userInfo = JSON.parse(userinfo)
                    // console.log('转化后info',userInfo)
                    this.setState({
                        userId: String(userInfo.id),
                        username:userInfo.username,
                        displayChildPost:false
                    },()=>{
                        console.log("state更新完成")
                        this.setState({
                            isLoading:false
                        },()=>{
                            console.log("isLoading状态",this.state.isLoading)
                        })
                    })
                })
                .catch(error => {
                    if(error.response.status==401){
                        console.log(error.response.status)
                        this.props.navigation.navigate("Login")
                        this.setState({
                            isLoading:false
                        })
                    }else{
                        console.log(error)
                    }
                });
        },1000)


    }

    componentWillMount() {
        this.loadingData()
    }


    dropDown = async (childrenCommentList) => {
        console.log(childrenCommentList)
        console.log(childrenCommentList.length)
        a += 1
        if (a % 2 == 0) {
            this.setState({
                displayChildPost: true
            })
        } else {
            this.setState({
                displayChildPost: false
            })
        }

        console.log(this.state.displayChildPost)
    }

    setPostContent(text) {
        this.setState({
            content: text
        })
        console.log(this.state.content)
    }

    setChildContent(text) {
        this.setState({
            childContent: text
        })
        console.log(this.state.childContent)
    }



    async appendPost(item) {
        const data = {
            parentId:item.postId,
            username: this.state.username,
            userId: this.state.userId,
            type: "post",
            content: this.state.childContent
        }

        console.log("准备提交的数据是",data)
        const api = new API()
        api.send({method: 'POST', url: APPENDPOST, obj: data}, (res) => {

            Alert.alert('🎸',res)
        })
        this.loadingData()
    }


    newPost() {
        const data = {
            parentId: null,
            username: this.state.username,
            userId: this.state.userId,
            type: this.state.type,
            content: this.state.content
        }
        const api = new API()
        api.send({method: 'POST', url: NEWPOST, obj: data}, (res) => {
            console.log(res)
        })

    }


    renderItem(item) {
        return (
            <TouchableOpacity
            >
                <View style={styles.cell_container}>

                    <ListItem
                        leftAvatar={{
                            title: item.username,
                            showEditButton: true,
                        }}
                        subtitle={item.content}
                        chevron
                    />

                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Icon
                                name='thumbs-up'
                                type='font-awesome'
                            />
                            <Text>{item.count_thumbUp}</Text>

                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Icon
                                name='comment'
                                type='font-awesome'
                                onPress={() => this.dropDown(item.childrenCommentList)}
                            />
                            <Text>{item.count_comment}</Text>
                        </View>
                    </View>

                    {this.state.displayChildPost ? <View><List containerStyle={{marginBottom: 20}}>
                        {
                            item.childrenCommentList.map((l) => (
                                <ListItem
                                    roundAvatar
                                    title={l.username+"         "+l.type+"                         "+this.timeTrim(l.updateTime)}
                                    key={l.postId}
                                    subtitle={l.content}
                                />
                            ))
                        }
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => this.setChildContent(text)}
                                onContentSizeChange={this._onContentSizeChange}
                            />
                            <Icon
                                name='edit'
                                type='font-awesome'
                                onPress={() => this.appendPost(item)}
                            />
                        </View>
                    </List></View> : null}


                </View>

            </TouchableOpacity>)
    }

    timeTrim(updateTime) {
        return  updateTime.slice(0,10);
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成';
        const tabs = [
            {title: '全部回复'},
            {title: '只看楼主'},
        ];
        return (<FlatList
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
        width: 300
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
