import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';

import
{
    ActionSheet,
    ActivityIndicator,
    Button,
    Card,
    Flex,
    Icon,
    Tabs,
    WhiteSpace,
    WingBlank,
} from '@ant-design/react-native';

import { Avatar,Divider } from 'react-native-elements'
import px2dp from "../utils/px2dp";
import API from "../http/axiosRequest";

import {LISTALL} from "../const/requestURL";
const { width, height } = Dimensions.get('window');


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
        }
    }

    componentWillMount() {
        const api=new API()
        api.send({method: 'GET', url:LISTALL}, (res) => {
            console.log(res)
        })
    }

    loadingData(){

    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成';
        const tabs = [
            { title: '全部回复' },
            { title: '只看楼主' },
        ];
        return( <FlatList
                data={[{key: 'a'}, {key: 'b'}]}
                renderItem={({item}) => <Text>{item.key}</Text>}
            />
       )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:px2dp(0),
        marginBottom:px2dp(0),
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        fontSize: px2dp(16),
        paddingLeft:px2dp(6),
        paddingRight:px2dp(6),
    },
    newInput: {
        flex:7,
        borderColor: '#eee',
        fontSize: px2dp(16),
        padding:px2dp(10),
        minHeight:px2dp(50),
        maxHeight:px2dp(100),
        height: 'auto'
    },
    inputSubmitNo: {
        fontSize: px2dp(16),
        textAlignVertical:'center',
        color: '#ddd'
    },
    inputSubmitYes: {
        fontSize: px2dp(16),
        textAlignVertical:'center',
        color: '#1890ff'
    },
    tabs:{
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
        textAlignVertical:'center',
        color:'#000',
        backgroundColor: '#fff',
    },
    infoUpText: {
        fontSize: px2dp(12),
        textAlign:'center',
        textAlignVertical:'center',
        color:'#999',
        backgroundColor: '#fff',
    },
    barDownText: {
        fontSize: px2dp(14),
        textAlignVertical:'center',
        color:'#000',
    },
    barUpHeaderText: {
        fontSize: px2dp(12),
        textAlign:'left',
        textAlignVertical:'center',
        color:'#999',
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
