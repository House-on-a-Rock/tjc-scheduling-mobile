import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, LogOutScreen, SettingsScreen } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Profile = createStackNavigator();
const LogOut = createStackNavigator();
const Settings = createStackNavigator();

export const ProfileStack = (props) => {
    const stackOptions = {
        headerLeft: () => (
            <Ionicons
                name="ios-menu"
                size={35}
                onPress={() => {
                    props.navigation.toggleDrawer();
                }}
                style={{ paddingLeft: 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0 }}
            />
        ),
    };
    return (
        <Profile.Navigator>
            <Profile.Screen
                name="Profile"
                component={ProfileScreen}
                options={stackOptions}
            />
        </Profile.Navigator>
    );
};

export const LogOutStack = (props) => {
    const stackOptions = {
        headerLeft: () => (
            <Ionicons
                name="ios-menu"
                size={35}
                onPress={() => {
                    props.navigation.toggleDrawer();
                }}
                style={{ paddingLeft: 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0 }}
            />
        ),
    };
    return (
        <LogOut.Navigator>
            <LogOut.Screen
                name="Log Out"
                component={LogOutScreen}
                options={stackOptions}
            />
        </LogOut.Navigator>
    );
};

export const SettingsStack = (props) => {
    const stackOptions = {
        headerLeft: () => (
            <Ionicons
                name="ios-menu"
                size={35}
                onPress={() => {
                    props.navigation.toggleDrawer();
                }}
                style={{ paddingLeft: 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0 }}
            />
        ),
    };
    return (
        <Settings.Navigator>
            <Settings.Screen
                name="Settings"
                component={SettingsScreen}
                options={stackOptions}
            />
        </Settings.Navigator>
    );
};
