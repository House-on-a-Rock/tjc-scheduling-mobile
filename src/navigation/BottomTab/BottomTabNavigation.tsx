import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardStack } from './DashboardStack';
import { ScheduleStack } from './ScheduleStack';
import { SettingsStack } from './SettingsStack';
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import { ActivityFeedStack } from './ActivityFeedStack';

const Tab = createBottomTabNavigator();

const icons = {
    // feedIcon: (props) => (
    //     <Icon name="bar-chart-outline" height={30} width={30} fill="#000000" />
    // ),
    feed: (props) => <Icon name="bar-chart-outline" {...props} />,
    dashboard: (props) => <Icon name="clipboard-outline" {...props} />,
    schedule: (props) => <Icon name="calendar-outline" {...props} />,
    settings: (props) => <Icon name="settings-outline" {...props} />,
};

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
        // onLayout={(event) => console.log('height', event.nativeEvent.layout.height)} may need this value later
    >
        <BottomNavigationTab title="Feed" icon={icons.feed} />
        <BottomNavigationTab title="Dashboard" icon={icons.dashboard} />
        <BottomNavigationTab title="Schedule" icon={icons.schedule} />
        <BottomNavigationTab title="Settings" icon={icons.settings} />
    </BottomNavigation>
);

//add badges to the bottom tab in the future:  https://github.com/akveo/react-native-ui-kitten/issues/865

export const BottomTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                lazy={false}
                initialRouteName="Feed"
                tabBar={(props) => <BottomTabBar {...props} />}
            >
                <Tab.Screen
                    name="Feed"
                    component={ActivityFeedStack}
                    // to add badges to the icon:
                    // options={{
                    //     tabBarIcon: icons.feedIcon,
                    //     tabBarBadge: '1',
                    // }}
                />
                <Tab.Screen name="Dashboard" component={DashboardStack} />
                <Tab.Screen name="Schedule" component={ScheduleStack} />
                <Tab.Screen name="Settings" component={SettingsStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
