import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityFeedScreen, TaskDetailsScreen } from '../../screens';

import {
    SwapScreen,
    SwapSummary,
    SwapConfirmation,
    SelectSwapOption,
} from '../../screens/RequestSwap/';

const Stack = createStackNavigator();

export const ActivityFeedStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ActivityFeed"
                component={ActivityFeedScreen}
                options={{ title: 'Feed' }}
            />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />

            <Stack.Screen name="SelectSwapOption" component={SelectSwapOption} />
            <Stack.Screen name="SwapScreen" component={SwapScreen} />
            <Stack.Screen name="SwapSummary" component={SwapSummary} />
            <Stack.Screen
                name="SwapConfirmation"
                component={SwapConfirmation}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
};
