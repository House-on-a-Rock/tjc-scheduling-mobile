import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarScreen, TasksScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { CalendarStackParamList } from '../../shared/models';

const CalStack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = (props) => {
    return (
        <CalStack.Navigator headerMode="none">
            <CalStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={stackOptions}
            />
            <CalStack.Screen
                name="Tasks"
                component={TasksScreen}
                // options={({ route }) => ({ title: route.params.name })}
            />
        </CalStack.Navigator>
    );
};
