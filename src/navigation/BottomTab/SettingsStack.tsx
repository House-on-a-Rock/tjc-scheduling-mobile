import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';
import { GeneralSettingsScreen } from '../../screens/';
import { LogoutScreen } from '../../screens';

const Stack = createStackNavigator();

export const settingStackNames = {
    Settings: 'Settings',
    General: 'General',
    Logout: 'Logout',
};

export const SettingsStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="General" component={GeneralSettingsScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
        </Stack.Navigator>
    );
};
