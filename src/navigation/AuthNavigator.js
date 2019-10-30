import Login from '../pages/Login'
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Icon} from "react-native-elements";


import Signup from '../pages/Signup'

export  const AuthNavigator = createSwitchNavigator({

    Login:{
        screen: Login
    },
    Signup: {
        screen: Signup
    },

},);
