import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    FlatList, Image
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

import {Avatar, Divider, ListItem, Icon} from 'react-native-elements'
import px2dp from "../utils/px2dp";
import API from "../http/axiosRequest";

import {APPENDPOST, LISTALL, NEWPOST} from "../const/requestURL";
import List from "@ant-design/react-native/es/list";
import  axios from 'axios'
import {defaultConfig} from "../const/config";

const {width, height} = Dimensions.get('window');


let a = 0
export default class Page3 extends React.Component {


    constructor(props) {
        super(props)
        const {navigation} = this.props;
        this.state = {
            refreshing: true,
            loading: false,
            hasScrolled: false,
            isCommentLoadEnd: false,
            commentPage: 0,
            postData: {},
            postImageList: [],
            commentList: [],
            clicked: 'none',
            modalVisible: false,
            picBtnVisible: false,
            images: [],
            text: '我的帖子',
            token: '',
            userFocused: true,
            userId: 1,
            displayChildPost: false,
            content: ""

        }
    }

    componentWillMount() {
            // const api = new API()
            // api.send({method: 'GET', url: LISTALL}, (res) => {
            //     console.log(res.status)
            //     this.setState({
            //         data: res
            //     })
            // })

        axios.get(LISTALL,
           defaultConfig
        )
            .then(response => {
                this.setState({
                    data:response.data
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error.response.status)
                if(error.response.status==401){
                    this.props.navigation.navigate("Login")
                }
            });
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

    appendPost() {
        const data = {
            parentId: this.state.parentId,
            username: this.state.username,
            userId: this.state.userId,
            type: "post",
            content: this.state.childContent
        }
        const api = new API()
        api.send({method: 'POST', url: APPENDPOST, obj: data}, (res) => {
            console.log(res)
        })
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
                                onChangeText={text => this.setPostContent(text)}
                                onContentSizeChange={this._onContentSizeChange}
                            />
                            <Icon
                                name='edit'
                                type='font-awesome'
                                onPress={() => this.appendPost()}
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
