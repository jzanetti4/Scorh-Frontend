import React, { useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import {
    createAppContainer,
    createDrawerNavigator,
    DrawerItems,
} from 'react-navigation';

import Components from "./drawer/Components";
import Profile from './drawer/profile';


const WINDOW_WIDTH = Dimensions.get('window').width;
const CustomDrawerContentComponent = props => (
    <View style={{ flex: 1, backgroundColor: '#43484d' }}>
        <View
            style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
        >
            <Image
                source={require('./images/logo.png')}
                style={{ width: Math.min(WINDOW_WIDTH * 0.57, 200) }}
                resizeMode="contain"
            />
        </View>
        <View style={{ marginLeft: 10 }}>
            <DrawerItems {...props} />
        </View>
    </View>
);

const MainRoot = createAppContainer(

    createDrawerNavigator(
        {
            Components: {
                path: '/components',
                screen: Components,
            },
            Profile: {
                path: '/profile',
                screen: Profile,
            },
        },{
            initialRouteName: 'Components',
            contentOptions: {
                activeTintColor: '#548ff7',
                activeBackgroundColor: 'transparent',
                inactiveTintColor: '#ffffff',
                inactiveBackgroundColor: 'transparent',
                labelStyle: {
                    fontSize: 15,
                    marginLeft: 0,
                },
            },
            drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
            contentComponent: CustomDrawerContentComponent,
        }
    )
)
export default MainRoot;
