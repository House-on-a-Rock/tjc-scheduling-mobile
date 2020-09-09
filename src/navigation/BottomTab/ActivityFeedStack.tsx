import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityFeed } from '../../screens';

const stack = createStackNavigator();

export const ActivityFeedStack = (props) => {
    return (
        <stack.Navigator headerMode="none">
            <stack.Screen name="ActivityFeed" component={ActivityFeed} />
        </stack.Navigator>
    );
};
