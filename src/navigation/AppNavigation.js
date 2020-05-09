import React from 'react';
import { ScheduleScreen, ChurchRegisterScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import {
    AuthenticationStack,
    CalendarStack,
    ProfileStack,
    LogOutStack,
    SettingsStack,
} from './index';

const MainTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={TabNav} />
                <Drawer.Screen name="Profile" component={ProfileStack} />
                <Drawer.Screen name="Settings" component={SettingsStack} />
                <Drawer.Screen name="Register Church" component={ChurchRegisterScreen} />
                <Drawer.Screen name="Log Out" component={LogOutStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

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

const TabNav = () => {
    return (
        <MainTab.Navigator screenOptions={tabNavigatorScreenOptions}>
            <MainTab.Screen
                name="CalendarStack"
                component={CalendarStack}
                options={{
                    title: 'Calendar',
                }}
            />
            <MainTab.Screen
                name="ScheduleScreen"
                component={ScheduleScreen}
                options={{ title: 'Schedule' }}
            />
        </MainTab.Navigator>
    );
};

const AppNavigation = () => {
    let isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    return isLoggedIn ? <DrawerNav /> : <AuthenticationStack />;
};

export default AppNavigation;
