import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '../../screens';
import { TaskDetailsScreen } from '../../screens';
import { stackOptions } from '../../shared/components';

const Stack = createStackNavigator();

export const ScheduleStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Schedule"
                component={ScheduleScreen}
                // options={stackOptions}
            />
            <Stack.Screen
                name="TaskDetails"
                component={TaskDetailsScreen}
                // options={stackOptions}
            />
        </Stack.Navigator>
    );
};
