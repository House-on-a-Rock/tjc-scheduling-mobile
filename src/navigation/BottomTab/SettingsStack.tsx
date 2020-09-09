import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { SettingsStackParamList } from '../../shared/models';

const stack = createStackNavigator();

export const SettingsStack = (props) => {
    return (
        <stack.Navigator headerMode="none">
            <stack.Screen
                name="Settings"
                component={SettingsScreen}
                // options={stackOptions}
            />
        </stack.Navigator>
    );
};
