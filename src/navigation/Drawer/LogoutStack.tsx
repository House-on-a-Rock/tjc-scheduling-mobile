import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LogoutScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { LogoutStackParamList } from '../../shared/models';

const LogOutStack = createStackNavigator<LogoutStackParamList>();

export const LogoutStack = (props) => {
    return (
        <LogOutStack.Navigator headerMode="none">
            <LogOutStack.Screen
                name="Logout"
                component={LogoutScreen}
                // options={stackOptions}
            />
        </LogOutStack.Navigator>
    );
};
