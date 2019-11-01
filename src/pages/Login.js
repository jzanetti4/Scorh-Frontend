import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions, Alert,
} from 'react-native';
import Signup from './Signup'
import {Input, Button, Icon} from 'react-native-elements';
import API from "../http/axiosRequest";
import {INITREG, LOGIN} from "../const/requestURL";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../assets/images/bg_screen1.jpg');

/**
 * this is the page for login
 */
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            email_valid: true,
            password: '',
            login_failed: false,
            showLoading: false,
            isLogin: true
        };
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _signInAsync = async () => {
        const api = new API()
        const data = (({email, password,}) => ({email, password}))(this.state)
        api.send({method: 'POST', url: LOGIN, obj: data}, (res) => {
            if (res.code == 0) {
                this.props.navigation.navigate("Home")
            } else {
                Alert.alert('🎸', res.msg);
            }
        })


    };


    submitLoginCredentials() {
        const {showLoading} = this.state;
        this.setState({
            showLoading: !showLoading,
        });
    }


    redirectToSignup = async () => {
        this.props.navigation.navigate("Signup")
    }


    render() {

        const {email, password, email_valid, showLoading} = this.state;
        return (

            <View style={styles.container}>

                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>

                    <View style={styles.loginView}>
                        <View style={styles.loginTitle}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.travelText}>Scorh</Text>
                            </View>

                            <View style={{marginTop: 20}}>
                                <Text style={styles.travelText}>Spinal cord research hub</Text>
                            </View>

                        </View>

                        <View style={styles.loginInput}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="user-o"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}
                                    />
                                }
                                containerStyle={{marginVertical: 10}}
                                onChangeText={email => this.setState({email})}
                                value={email}
                                inputStyle={{marginLeft: 10, color: 'white'}}
                                keyboardAppearance="light"
                                placeholder="Email"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                                returnKeyType="next"
                                ref={input => (this.emailInput = input)}
                                onSubmitEditing={() => {
                                    this.setState({email_valid: this.validateEmail(email)});
                                    this.passwordInput.focus();
                                }}
                                blurOnSubmit={false}
                                placeholderTextColor="white"
                                errorStyle={{textAlign: 'center', fontSize: 12}}
                                errorMessage={
                                    email_valid ? null : 'Please enter a valid email address'
                                }
                            />
                            <Input
                                leftIcon={
                                    <Icon
                                        name="lock"
                                        type="font-awesome"
                                        color="rgba(171, 189, 219, 1)"
                                        size={25}
                                    />
                                }
                                containerStyle={{marginVertical: 10}}
                                onChangeText={password => this.setState({password})}
                                value={password}
                                inputStyle={{marginLeft: 10, color: 'white'}}
                                secureTextEntry={true}
                                keyboardAppearance="light"
                                placeholder="Password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                ref={input => (this.passwordInput = input)}
                                blurOnSubmit={true}
                                placeholderTextColor="white"
                            />
                        </View>
                        <Button
                            title="LOG IN"
                            activeOpacity={1}
                            underlayColor="transparent"
                            // onPress={this.submitLoginCredentials.bind(this)}
                            onPress={this._signInAsync}
                            loading={showLoading}
                            loadingProps={{size: 'small', color: 'white'}}
                            disabled={!email_valid && password.length < 8}
                            buttonStyle={{
                                height: 50,
                                width: 250,
                                backgroundColor: 'transparent',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{marginVertical: 10}}
                            titleStyle={{color: 'white'}}
                        />
                        <View style={styles.footerView}>
                            <Text style={{color: 'grey'}}>New here?</Text>
                            <Button
                                title="Create an Account"
                                type="clear"
                                activeOpacity={0.5}
                                titleStyle={{color: 'white', fontSize: 15}}
                                containerStyle={{marginTop: -10}}
                                onPress={this.redirectToSignup}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginView: {
        marginTop: 150,
        width: 250,
        height: 400,
    },
    loginTitle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    travelText: {
        color: 'white',
        fontSize: 30,

    },
    plusText: {
        color: 'white',
        fontSize: 30,

    },
    loginInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerView: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
