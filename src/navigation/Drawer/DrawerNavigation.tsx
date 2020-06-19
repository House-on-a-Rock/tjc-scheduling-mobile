import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '../../shared/models';
import { CalendarStack } from './CalendarStack';
import { ProfileStack } from './ProfileStack';
import { SettingsStack } from './SettingsStack';
import { LogoutStack } from './LogoutStack';
import { Drawer, DrawerItem, Layout, Text, IndexPath } from '@ui-kitten/components';

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParamList>();

export const DrawerNav = () => {
    return (
        <NavigationContainer>
            <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Screen
                    name="CalendarStack"
                    component={CalendarStack}
                    options={{ title: 'Home' }}
                />
                <Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{ title: 'Profile' }}
                />
                <Screen
                    name="SettingsStack"
                    component={SettingsStack}
                    options={{ title: 'Settings' }}
                />
                <Screen
                    name="LogoutStack"
                    component={LogoutStack}
                    options={{ title: 'Logout' }}
                />
            </Navigator>
        </NavigationContainer>
    );
};

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
    >
        <DrawerItem title="CalendarStack" />
        <DrawerItem title="ProfileStack" />
        <DrawerItem title="SettingsStack" />
        <DrawerItem title="LogoutStack" />
    </Drawer>
);
