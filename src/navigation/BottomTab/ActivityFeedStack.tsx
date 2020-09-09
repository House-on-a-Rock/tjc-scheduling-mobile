import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityFeedScreen } from '../../screens';
import { TaskDetailsScreen } from '../../screens';

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
        </Stack.Navigator>
    );
};
