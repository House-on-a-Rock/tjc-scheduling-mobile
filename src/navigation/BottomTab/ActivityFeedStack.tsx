import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityFeed } from '../../screens';

import { LogoutStackParamList } from '../../shared/models';
import { TaskDetailsScreen } from '../../screens/Tab/TaskDetailsScreen';

const stack = createStackNavigator<LogoutStackParamList>();

export const ActivityFeedStack = (props) => {
    return (
        <stack.Navigator headerMode="none">
            <stack.Screen name="Feed" component={ActivityFeed} />
            {/* <stack.Screen name="Task Details" component={TaskDetailsScreen} /> */}
        </stack.Navigator>
    );
};
