import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LogoutScreen } from '../../screens/Drawer/LogoutScreen';

import { DrawerStackParamList, LogoutParamList } from '../models';
import { stackOptions } from '../shared';

const LogOutStack = createStackNavigator<LogoutParamList>();

export const LogoutStack = (props) => {
    return (
        <LogOutStack.Navigator>
            <LogOutStack.Screen
                name="Logout"
                component={LogoutScreen}
                options={stackOptions}
            />
        </LogOutStack.Navigator>
    );
};
