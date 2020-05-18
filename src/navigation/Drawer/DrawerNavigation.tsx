import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from '..';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { ProfileStack } from './ProfileStack';
import { SettingsStack } from './SettingsStack';
import { LogoutStack } from './LogoutStack';

export const stackOptions = (props) => {
    return {
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
};

export type DrawerStackParamList = {
    HomeStack: undefined;
    ProfileStack: undefined;
    SettingsStack: undefined;
    LogoutStack: undefined;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export const DrawerNav = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator>
                <Drawer.Screen name="HomeStack" component={HomeStack} />
                <Drawer.Screen name="ProfileStack" component={ProfileStack} />
                <Drawer.Screen name="SettingsStack" component={SettingsStack} />
                <Drawer.Screen name="LogoutStack" component={LogoutStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};
