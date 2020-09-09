import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { DashboardStack } from './DashboardStack';
import { ScheduleStack } from './ScheduleStack';
import { SettingsStack } from './SettingsStack';
import {
    Icon,
    BottomNavigation,
    BottomNavigationTab,
    Layout,
    Text,
} from '@ui-kitten/components';

import { ActivityFeedStack } from './ActivityFeedStack';

const Tab = createBottomTabNavigator();

const icons = {
    feedIcon: (props) => <Icon name="bar-chart-outline" {...props} />,
    dashboard: (props) => <Icon name="clipboard-outline" {...props} />,
    schedule: (props) => <Icon name="calendar-outline" {...props} />,
    settings: (props) => <Icon name="settings-outline" {...props} />,
};

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab title="Feed" icon={icons.feedIcon} />
        <BottomNavigationTab title="Dashboard" icon={icons.dashboard} />
        <BottomNavigationTab title="Schedule" icon={icons.schedule} />
        <BottomNavigationTab title="Settings" icon={icons.settings} />
    </BottomNavigation>
);

export const BottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                lazy={false}
                initialRouteName="Feed"
                tabBar={(props) => <BottomTabBar {...props} />}
            >
                <Tab.Screen name="Feed" component={ActivityFeedStack} />
                <Tab.Screen name="Dashboard" component={DashboardStack} />
                <Tab.Screen name="Schedule" component={ScheduleStack} />
                <Tab.Screen name="Settings" component={SettingsStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
