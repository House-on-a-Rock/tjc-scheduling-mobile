import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';
import { stackOptions } from '../shared';
import { SettingsParamList } from '../models';

const SetStack = createStackNavigator<SettingsParamList>();

export const SettingsStack = (props) => {
    return (
        <SetStack.Navigator>
            <SetStack.Screen
                name="Settings"
                component={SettingsScreen}
                options={stackOptions}
            />
        </SetStack.Navigator>
    );
};
