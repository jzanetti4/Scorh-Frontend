import Login from '../pages/Login'
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';



import Signup from '../pages/Signup'

/**
 * AuthNavigator before for user to validate their authentication
 * @type {NavigationContainer}
 */
export  const AuthNavigator = createSwitchNavigator({

    Login:{
        screen: Login
    },
    Signup: {
        screen: Signup
    },

},);
