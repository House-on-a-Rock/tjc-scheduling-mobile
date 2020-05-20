import React from 'react';
import { CalendarScreen, TasksScreen } from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { stackOptions } from '../../shared';
import { CalendarStackParamList } from '../../models';

const CalStack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = () => {
    return (
        <CalStack.Navigator>
            <CalStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={stackOptions}
            />
            <CalStack.Screen
                name="Tasks"
                component={TasksScreen}
                options={stackOptions}
            />
        </CalStack.Navigator>
    );
};
