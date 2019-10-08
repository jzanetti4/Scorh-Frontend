import Login from '../pages/Login'
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

export  const AuthNavigator = createStackNavigator({ SignIn: Login });
