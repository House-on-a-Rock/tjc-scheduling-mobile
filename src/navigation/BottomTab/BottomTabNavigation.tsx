import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarStack } from './CalendarStack';
import { ProfileStack } from './ProfileStack';
import { SettingsStack } from './SettingsStack';

import { ActivityFeedStack } from './ActivityFeedStack';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={ActivityFeedStack} />
            <Tab.Screen name="Dashboard" component={ActivityFeedStack} />
            <Tab.Screen name="Feed" component={ActivityFeedStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};
