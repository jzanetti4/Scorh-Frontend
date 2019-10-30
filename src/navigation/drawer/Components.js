import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';
import HomeScreen from '../../screens/HomeScreen';
import Group from '../../screens/GroupScreen';
import Member from '../../screens/MemberScreen';
import {Icon} from 'react-native-elements';
import Page1 from '../../pages/Page1'
import Page3 from '../../pages/Page3'
import Page4 from '../../pages/Page4'
import Page5 from '../../pages/Page5'
import Signup from "../../pages/Signup";


const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: {
            navigationOptions: ({navigation}) => ({
                title: 'NoticeBoard',
                headerLeft: (
                    <Icon
                        name="menu"
                        size={30}
                        type="entypo"
                        containerStyle={{marginLeft: 10}}
                        onPress={navigation.toggleDrawer}
                    />),
            }),
            screen: Page1
        },

        Page4: {
            screen: Page4
        },
        Page3: {
            screen: Page3
        }


    },
);

HomeStack.navigationOptions = {
    drawerLabel: 'Component',
    drawerIcon: ({tintColor}) => (
        <Icon
            name="person"
            size={30}
            iconStyle={{
                width: 30,
                height: 30,
            }}
            type="material"
            color={tintColor}
        />
    ),
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
    {
        Home: {
            navigationOptions: ({navigation}) => ({
                title: 'Member',
                headerLeft: (
                    <Icon
                        name="menu"
                        size={30}
                        type="entypo"
                        containerStyle={{marginLeft: 10}}
                        onPress={navigation.toggleDrawer}
                    />),
            }),
            screen: Member
        },
    }
);

SettingsStack.navigationOptions = {
    drawerLabel: 'Component',
    drawerIcon: ({tintColor}) => (
        <Icon
            name="person"
            size={30}
            iconStyle={{
                width: 30,
                height: 30,
            }}
            type="material"
            color={tintColor}
        />
    ),
    tabBarLabel: 'Member',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};
SettingsStack.path = '';


const LinksStack = createStackNavigator(
    {
        Home: {
            navigationOptions: ({navigation}) => ({
                title: 'Group',
                headerLeft: (
                    <Icon
                        name="menu"
                        size={30}
                        type="entypo"
                        containerStyle={{marginLeft: 10}}
                        onPress={navigation.toggleDrawer}
                    />),
            }),
            screen: Group
        },
    }
);

LinksStack.navigationOptions = {
    drawerLabel: 'Component',
    drawerIcon: ({tintColor}) => (
        <Icon
            name="person"
            size={30}
            iconStyle={{
                width: 30,
                height: 30,
            }}
            type="material"
            color={tintColor}
        />
    ),
    tabBarLabel: 'Group',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};
LinksStack.path=''


const components = createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
});

components.path = '';

export default createStackNavigator(
    {
        ComponentsTabs: {screen: components},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            drawerLabel: 'Components',
            drawerIcon: ({tintColor}) => (
                <Icon
                    name="settings"
                    size={30}
                    iconStyle={{
                        width: 30,
                        height: 30,
                    }}
                    type="material"
                    color={tintColor}
                />
            ),
        }
    }
);

