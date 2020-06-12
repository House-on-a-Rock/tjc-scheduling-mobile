import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '../../shared/models';

import { HomeStack } from './Tab/HomeStack';
import { ProfileStack } from './ProfileStack';
import { SettingsStack } from './SettingsStack';
import { LogoutStack } from './LogoutStack';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

export const DrawerNav = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator>
                <Drawer.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{ title: 'Home' }}
                />
                <Drawer.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{ title: 'Profile' }}
                />
                <Drawer.Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{ title: 'Settings' }}
                />
                <Drawer.Screen
                    name="LogoutStack"
                    component={LogoutStack}
                    options={{ title: 'Logout' }}
                />
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
