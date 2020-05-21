import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { CalendarStack } from './CalendarStack';
import { ScheduleStack } from './ScheduleStack';
import { HomeStackTabParamList } from 'shared/models';

const HomeTab = createBottomTabNavigator<HomeStackTabParamList>();

const tabNavigatorScreenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'CalendarStack') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
        } else if (route.name === 'ScheduleScreen') {
            iconName = focused ? 'ios-list' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

export const HomeStack = () => {
    return (
        <HomeTab.Navigator screenOptions={tabNavigatorScreenOptions}>
            <HomeTab.Screen
                name="CalendarStack"
                component={CalendarStack}
                options={{ title: 'Calendar' }}
            />
            <HomeTab.Screen
                name="ScheduleStack"
                component={ScheduleStack}
                options={{ title: 'Schedule' }}
            />
        </HomeTab.Navigator>
    );
};
