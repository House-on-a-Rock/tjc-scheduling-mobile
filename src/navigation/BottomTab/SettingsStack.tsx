import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';
import { GeneralSettingsScreen } from '../../screens/';
import { LogoutScreen } from '../../screens';

const stack = createStackNavigator();

export const settingStackNames = {
    Settings: 'Settings',
    General: 'General',
    Logout: 'Logout',
};

export const SettingsStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Settings" component={SettingsScreen} />
            <stack.Screen name="General" component={GeneralSettingsScreen} />
            <stack.Screen name="Logout" component={LogoutScreen} />
        </stack.Navigator>
    );
};
