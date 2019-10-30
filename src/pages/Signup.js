import React, { Component } from 'react';
import {
    Alert,
    LayoutAnimation,
    TouchableOpacity,
    Dimensions,
    Image,
    UIManager,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import API from "../http/axiosRequest";
import {INITREG} from "../const/requestURL";
import axios from "axios"


const LinearGradient=undefined

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const USER_COOL = require('../../assets/images/user-cool.png');
const USER_STUDENT = require('../../assets/images/user-student.png');
const USER_HP = require('../../assets/images/user-hp.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectedType: null,
            username: '',
            email: '',
            password: '',
            confirmationPassword: '',
            emailValid: true,
            passwordValid: true,
            usernameValid: true,
            confirmationPasswordValid: true,
            isLogin: false
        };

        this.setSelectedType = this.setSelectedType.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
            this
        );
        this.signup = this.signup.bind(this);

    }



    signup() {

        LayoutAnimation.easeInEaseOut();
        const usernameValid = this.validateUsername();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        const confirmationPasswordValid = this.validateConfirmationPassword();
        if (

            passwordValid &&
            confirmationPasswordValid &&
            usernameValid && emailValid
        ) {
            // this.setState({ isLoading: true });
            // setTimeout(() => {
            //     LayoutAnimation.easeInEaseOut();
            //     this.setState({ isLoading: false });
            //
            // }, 1500);

            const api=new API()
            const data=(({username,email,password,selectedType})=>({username,email,password,selectedType}))(this.state)

            // const data={
            //     email: "yhq19951005@gmail.com",
            //     password: "12345678",
            //     selectedType: "child",
            //     username: "Yhq",
            //
            //
            // }
            api.send({method: 'POST', url: INITREG,obj:data}, (res) => {

                this.setState({
                    isLoading: false
                },()=>{
                    console.log(res)
                    console.log(String(res)=="email has been sent")
                    console.log(String(res)=="email has already been registed")
                    Alert.alert('🎸', res);
                    if(String(res)=="email has been sent" || String(res)=="email has already been registed"){
                        console.log('got is')
                        this.props.navigation.navigate("Login")
                    }
                })

                })
            this.setState({
                isLoading: true
            })

        }
    }

    validateUsername() {
        const { username } = this.state;
        const usernameValid = username.length > 0;
        LayoutAnimation.easeInEaseOut();
        this.setState({ usernameValid });
        usernameValid || this.usernameInput.shake();
        return usernameValid;
    }

    validateEmail() {
        const { email } = this.state;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailValid = re.test(email);
        LayoutAnimation.easeInEaseOut();
        this.setState({ emailValid });
        emailValid || this.emailInput.shake();
        return emailValid;
    }

    validatePassword() {
        const { password } = this.state;
        const passwordValid = password.length >= 8;
        LayoutAnimation.easeInEaseOut();
        this.setState({ passwordValid });
        passwordValid || this.passwordInput.shake();
        return passwordValid;
    }

    validateConfirmationPassword() {
        const { password, confirmationPassword } = this.state;
        const confirmationPasswordValid = password === confirmationPassword;
        LayoutAnimation.easeInEaseOut();
        this.setState({ confirmationPasswordValid });
        confirmationPasswordValid || this.confirmationPasswordInput.shake();
        return confirmationPasswordValid;
    }

    setSelectedType = selectedType =>
        LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

    render() {
        const {navigation} = this.props;
        const {
            isLoading,
            selectedType,
            confirmationPassword,
            email,
            emailValid,
            password,
            passwordValid,
            confirmationPasswordValid,
            username,
            usernameValid,
        } = this.state;

        return (
            <View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <KeyboardAvoidingView
                    behavior="position"
                    contentContainerStyle={styles.formContainer}
                >
                    <Text style={styles.signUpText}>Sign up</Text>
                    <Text style={styles.whoAreYouText}>WHO YOU ARE ?</Text>
                    <View style={styles.userTypesContainer}>
                        <UserTypeItem
                            label="RESEARCHER"
                            labelColor="#ECC841"
                            image={USER_COOL}
                            onPress={() => this.setSelectedType('researcher')}
                            selected={selectedType === 'researcher'}
                        />
                        <UserTypeItem
                            label="STUDENT"
                            labelColor="#2CA75E"
                            image={USER_STUDENT}
                            onPress={() => this.setSelectedType('student')}
                            selected={selectedType === 'student'}
                        />
                        <UserTypeItem
                            label="CUSTOMER"
                            labelColor="#36717F"
                            image={USER_HP}
                            onPress={() => this.setSelectedType('customer')}
                            selected={selectedType === 'customer'}
                        />
                    </View>
                    <View style={{ width: '80%', alignItems: 'center' }}>
                        <FormInput
                            refInput={input => (this.usernameInput = input)}
                            icon="user"
                            value={username}
                            onChangeText={username => this.setState({ username })}
                            placeholder="Username"
                            returnKeyType="next"
                            errorMessage={
                                usernameValid ? null : "Your username can't be blank"
                            }
                            onSubmitEditing={() => {
                                this.validateUsername();
                                this.emailInput.focus();
                            }}
                        />
                        <FormInput
                            refInput={input => (this.emailInput = input)}
                            icon="envelope"
                            value={email}
                            onChangeText={email => this.setState({ email })}
                            placeholder="Email"
                            keyboardType="email-address"
                            returnKeyType="next"
                            errorMessage={
                                emailValid ? null : 'Please enter a valid email address'
                            }
                            onSubmitEditing={() => {
                                this.validateEmail();
                                this.passwordInput.focus();
                            }}
                        />
                        <FormInput

                            refInput={input => (this.passwordInput = input)}
                            icon="lock"
                            value={password}
                            onChangeText={password => this.setState({ password })}
                            placeholder="Password"
                            secureTextEntry
                            returnKeyType="next"
                            errorMessage={
                                passwordValid ? null : 'Please enter at least 8 characters'
                            }
                            onSubmitEditing={() => {
                                this.validatePassword();
                                this.confirmationPasswordInput.focus();
                            }}
                        />
                        <FormInput
                            refInput={input => (this.confirmationPasswordInput = input)}
                            icon="lock"
                            value={confirmationPassword}
                            onChangeText={confirmationPassword =>
                                this.setState({ confirmationPassword })
                            }
                            placeholder="Confirm Password"
                            secureTextEntry
                            errorMessage={
                                confirmationPasswordValid
                                    ? null
                                    : 'The password fields are not identics'
                            }
                            returnKeyType="go"
                            onSubmitEditing={() => {
                                this.validateConfirmationPassword();
                                this.signup();
                            }}
                        />
                    </View>
                    <Button
                        loading={isLoading}
                        title="SIGNUP"
                        containerStyle={{ flex: -1 }}
                        buttonStyle={styles.signUpButton}
                        linearGradientProps={{
                            colors: ['#FF9800', '#F44336'],
                            start: [1, 0],
                            end: [0.2, 0],
                        }}
                        ViewComponent={LinearGradient}
                        titleStyle={styles.signUpButtonText}
                        onPress={this.signup}
                        // disabled={isLoading}


                    />
                </KeyboardAvoidingView>

                <View style={styles.loginHereContainer}>
                    <Text style={styles.alreadyAccountText}>
                        Already have an account.
                    </Text>
                    <Button
                        title="Login here"
                        titleStyle={styles.loginHereText}
                        containerStyle={{ flex: -1 }}
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        underlayColor="transparent"

                        onPress={() => {
                            this.props.navigation.navigate("Login")
                        }}
                    />
                </View>
            </ScrollView>
            </View>
        );
    }
}

export const UserTypeItem = props => {
    const { image, label, labelColor, selected, ...attributes } = props;
    return (
        <TouchableOpacity {...attributes}>
            <View
                style={[
                    styles.userTypeItemContainer,
                    selected && styles.userTypeItemContainerSelected,
                ]}
            >
                <Text style={[styles.userTypeLabel, { color: labelColor }]}>
                    {label}
                </Text>
                <Image
                    source={image}
                    style={[
                        styles.userTypeMugshot,
                        selected && styles.userTypeMugshotSelected,
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

export const FormInput = props => {
    const { icon, refInput, ...otherProps } = props;
    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={styles.inputContainer}
            leftIcon={
                <Icon name={icon} type={'simple-line-icon'} color="#7384B4" size={18} />
            }
            inputStyle={styles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            errorStyle={styles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#7384B4"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#293046',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    signUpText: {
        color: 'white',
        fontSize: 28,

    },
    whoAreYouText: {
        color: '#7384B4',

        fontSize: 14,
    },
    userTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: SCREEN_WIDTH,
        alignItems: 'center',
    },
    userTypeItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
    userTypeItemContainerSelected: {
        opacity: 1,
    },
    userTypeMugshot: {
        margin: 4,
        height: 70,
        width: 70,
    },
    userTypeMugshotSelected: {
        height: 100,
        width: 100,
    },
    userTypeLabel: {
        color: 'yellow',

        fontSize: 11,
    },
    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',

        fontSize: 16,
    },
    errorInputStyle: {
        marginTop: 0,
        textAlign: 'center',
        color: '#F44336',
    },
    signUpButtonText: {

        fontSize: 13,
    },
    signUpButton: {
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
    },
    loginHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alreadyAccountText: {

        fontSize: 12,
        color: 'white',
    },
    loginHereText: {
        color: '#FF9800',

        fontSize: 12,
    },
});
