import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '../../screens';
import { TaskDetailsScreen } from '../../screens';
import {
    SwapScreen,
    SwapSummary,
    SwapConfirmation,
    SelectSwapOption,
} from '../../screens/RequestSwap/';

const Stack = createStackNavigator();

export const ScheduleStack = () => {
    return (
        <Stack.Navigator screenOptions={{ title: '', headerStyle: { height: 60 } }}>
            <Stack.Screen name="Schedule" component={ScheduleScreen} />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />

            <Stack.Screen name="SelectSwapOption" component={SelectSwapOption} />
            <Stack.Screen name="SwapScreen" component={SwapScreen} />
            <Stack.Screen name="SwapSummary" component={SwapSummary} />
            <Stack.Screen name="SwapConfirmation" component={SwapConfirmation} />
        </Stack.Navigator>
    );
};
