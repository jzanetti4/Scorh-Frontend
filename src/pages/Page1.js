import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
    FlatList, Image, Alert, RefreshControl
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;


import {colors} from '../const/colors'
import {Avatar, Divider, ListItem, Icon} from 'react-native-elements'
import px2dp from "../utils/px2dp";
import API from "../http/axiosRequest";

import {APPENDPOST, FINDBYCONTENT, FINDBYUSERNAME, FINDYTYPE, LISTALL, NEWPOST} from "../const/requestURL";
import List from "@ant-design/react-native/es/list";
import  axios from 'axios'
import {defaultConfig} from "../const/config";
import { Dropdown } from 'react-native-material-dropdown';
import { SearchBar } from 'react-native-elements';
const {width, height} = Dimensions.get('window');


let a = 0
export default class Page1 extends React.Component {

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
            isLoading:false,

            searchUser:"",
            searchContent:"",
            searchType:""
        }
    }


    async searchByuser(user) {
        this.setState({
            searchUser:user
        })
        const api=new API()
        console.log(FINDBYUSERNAME+this.state.searchUser)
        api.send({method: 'GET', url: FINDBYUSERNAME+user}, (res) => {
            this.setState({
                data:res
            })
            }
        );
    }
    async searchByContent(content) {
        this.setState({
            searchContent:content
        })
        console.log(FINDBYCONTENT+content)
        const api=new API()
        api.send({method: 'GET', url: FINDBYCONTENT+content}, (res) => {
                console.log(res)
                this.setState({
                    data:res
                })
            }
        );
    }

    async searchByType(type) {

        console.log(FINDBYUSERNAME+type)
        const api=new API()
        api.send({method: 'GET', url: FINDYTYPE+type}, (res) => {
            this.setState({
                data:res
            })
            }
        );
    }




    async loadingData(){
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
                        displayChildPost:false,
                        content: null,
                        childContent:null,
                    },()=>{
                        this.setState({
                            isLoading:false
                        }
                        )
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

        const api = new API()
        api.send({method: 'POST', url: APPENDPOST, obj: data}, (res) => {
            Alert.alert('🎸',res)
        })
        this.loadingData()
    }


    async newPost() {
        const data = {
            parentId: null,
            username: this.state.username,
            userId: this.state.userId,
            type: this.state.type,
            content: this.state.content
        }
        const api = new API()
        api.send({method: 'POST', url: NEWPOST, obj: data}, (res) => {
            Alert.alert('🎸',res)
        })
        this.loadingData()
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
                        subtitle={"/"+item.type+"/           "+item.content}
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
                                    title={l.username+"         "+l.type+"                  "+this.timeTrim(l.updateTime)}
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

        const data=[{
            value: 'post',
        }, {
            value: 'News',
        }, {
            value: 'Event',
        }]
        return (
            <View style={styles.container}>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => this.setPostContent(text)}
                    onContentSizeChange={this._onContentSizeChange}
                    placeholder={"publish your post here"}
                    placeholderTextColor={colors.Grey}
                />

                <Dropdown
                    data={data}
                    containerStyle={{width: 90}}
                    onChangeText={(value)=>{this.setState({type:value})}}
                />
                <Icon
                    name='edit'
                    type='font-awesome'
                    onPress={() => this.newPost()}
                />
            </View>
                <View style={styles.row}>
                    <SearchBar
                        placeholder="search user"
                        onChangeText={(value)=>this.searchByuser(value)}
                        containerStyle={{width:SCREEN_WIDTH}}
                        value={this.state.searchUser}
                    />
                </View>
                <View style={styles.row}>
                    <SearchBar
                        placeholder="search content"
                        onChangeText={(value)=>this.searchByContent(value)}
                        containerStyle={{width:SCREEN_WIDTH}}
                        value={this.state.searchContent}
                    />
                </View>
                <View style={styles.row}>
                <Dropdown
                    data={data}
                    containerStyle={{width: SCREEN_WIDTH}}
                    onChangeText={(value)=>{this.searchByType(value)}}
                />
                </View>
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
