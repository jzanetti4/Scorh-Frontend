import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../../components/TabBarIcon';
import HomeScreen from '../../screens/HomeScreen';
import LinksScreen from '../../screens/LinksScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { Icon } from 'react-native-elements';
import Page1 from '../../pages/Page1'
import Page3 from '../../pages/Page3'
import Page4 from '../../pages/Page4'
import Page5 from '../../pages/Page5'

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: {
            navigationOptions: ({ navigation }) => ({
                title: 'Buttons',
                headerLeft: (
                    <Icon
                        name="menu"
                        size={30}
                        type="entypo"
                        containerStyle={{ marginLeft: 10 }}
                        onPress={navigation.toggleDrawer}
                    />),
                }),
            screen: Page1
        },

    },

);

HomeStack.navigationOptions = {
    drawerLabel: 'Component',
    drawerIcon: ({ tintColor }) => (
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

const LinksStack = createStackNavigator(
    {
        Links: LinksScreen,
    },
    config
);

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}/>
    ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen,
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

SettingsStack.path = '';

const components = createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
});

components.path = '';

export default createStackNavigator(
    {
        ComponentsTabs: { screen: components },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            drawerLabel: 'Components',
            drawerIcon: ({ tintColor }) => (
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
