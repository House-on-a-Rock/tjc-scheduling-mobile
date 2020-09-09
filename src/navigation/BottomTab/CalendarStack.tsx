import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarScreen, TaskListScreen, TaskDetailsScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { CalendarStackParamList } from '../../shared/models';
import { RequestSwapStack } from '../RequestSwap/RequestSwapStack';

const CalStack = createStackNavigator<CalendarStackParamList>();

export const CalendarStack = (props) => {
    return (
        <CalStack.Navigator headerMode="none">
            <CalStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={stackOptions}
            />
            <CalStack.Screen name="TaskList" component={TaskListScreen} />
            <CalStack.Screen name="TaskDetails" component={TaskDetailsScreen} />
            <CalStack.Screen name="RequestSwap" component={RequestSwapStack} />
        </CalStack.Navigator>
    );
};
