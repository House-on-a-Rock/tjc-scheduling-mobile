import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '../../screens';
import { stackOptions } from '../../shared/components';

const stack = createStackNavigator();

export const ScheduleStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen
                name="Schedule"
                component={ScheduleScreen}
                // options={stackOptions}
            />
        </stack.Navigator>
    );
};
