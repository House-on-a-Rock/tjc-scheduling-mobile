import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { SettingsStackParamList } from '../../shared/models';

const SetStack = createStackNavigator<SettingsStackParamList>();

export const SettingsStack = (props) => {
    return (
        <SetStack.Navigator headerMode="none">
            <SetStack.Screen
                name="Settings"
                component={SettingsScreen}
                // options={stackOptions}
            />
        </SetStack.Navigator>
    );
};
