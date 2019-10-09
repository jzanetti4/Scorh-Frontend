import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import API from '../http/axiosRequest'

import axios from 'axios'
export default class Page1 extends React.Component {
    //也可在这里定义每个页面的导航属性，这里的定义会覆盖掉别处的定义
    // static navigationOptions = {
    //     title: 'Page1',
    // };


    constructor(props) {
        super(props);
        this.sendGetRequest = this.sendGetRequest.bind(this)
        this.sendPostRequest = this.sendPostRequest.bind(this)
    }

    sendGetRequest() {
        const api = new API()
        //检测最新版本
        api.send({method: 'GET', url: "/test"}, (res) => {
                console.log(res)
            }
        );
    }

    sendPostRequest() {
        const api = new API()
        //检测最新版本
        const object =
            {
                age: "12",
                name: "yhq"
            }

        api.send({method: 'POST', url: "/post", obj:object}, (res) => {
                console.log(res)
            }
        );


    }

    render() {
        const {navigation} = this.props;
        return <View style={{flex: 1, marginTop: 30}}>
            <Text style={styles.text}>欢迎来到Page1</Text>
            <Button
                title="Go Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <Button
                title="改变主题色"
                onPress={() => {
                    navigation.setParams({
                        theme: {
                            tintColor: 'orange',
                            updateTime: new Date().getTime()
                        }
                    })
                }}
            />
            <Button
                title="跳转到页面4"
                onPress={() => {
                    navigation.navigate("Page4")
                }}
            />


            <Button
                title="发送get请求"
                onPress={this.sendGetRequest
                }
            />

            <Button
                title="发送Post请求"
                onPress={this.sendPostRequest
                }
            />
        </View>
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white'
    }
});
