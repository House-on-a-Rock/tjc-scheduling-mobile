import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { ProfileStackParamList } from '../../shared/models';

const Stack = createStackNavigator();

export const ProfileStack = (props) => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={stackOptions}
            />
        </Stack.Navigator>
    );
};
