import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../../screens/Tab/DashboardScreen';

const stack = createStackNavigator();

export const DashboardStack = (props) => {
    return (
        <stack.Navigator>
            <stack.Screen name="Dashboard" component={DashboardScreen} />
        </stack.Navigator>
    );
};
