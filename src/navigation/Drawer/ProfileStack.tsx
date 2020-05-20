import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../screens';
import { stackOptions } from '../shared';
import { ProfStackParamList } from '../models';

const ProfStack = createStackNavigator<ProfStackParamList>();

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
