import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from 'screens/index';
import { stackOptions } from 'shared/components';
import { ProfileStackParamList } from 'shared/models';

const ProfStack = createStackNavigator<ProfileStackParamList>();

export const ProfileStack = (props) => {
    return (
        <ProfStack.Navigator>
            <ProfStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={stackOptions}
            />
        </ProfStack.Navigator>
    );
};
