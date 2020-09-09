import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';

const stack = createStackNavigator();

export const SettingsStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Settings" component={SettingsScreen} />
        </stack.Navigator>
    );
};
