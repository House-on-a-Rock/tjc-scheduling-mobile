import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamList } from '../../shared/models';
import { CalendarStack } from './CalendarStack';
import { ProfileStack } from './ProfileStack';
import { SettingsStack } from './SettingsStack';
import { LogoutStack } from './LogoutStack';
import { Drawer, DrawerItem, IndexPath, Icon, Text, Layout } from '@ui-kitten/components';
import { statusBarHeight } from '../../shared/constants';

const { Navigator, Screen } = createDrawerNavigator<DrawerStackParamList>();

export const DrawerNav = () => {
    return (
        <NavigationContainer>
            <Navigator
                drawerStyle={{ width: 200 }}
                drawerType="front"
                drawerContent={(props) => <DrawerContent {...props} />}
                drawerContentOptions={{
                    activeBackgroundColor: 'red',
                    activeTintColor: 'blue',
                }}
            >
                <Screen name="CalendarStack" component={CalendarStack} />
                <Screen name="ProfileStack" component={ProfileStack} />
                <Screen name="SettingsStack" component={SettingsStack} />
                <Screen name="LogoutStack" component={LogoutStack} />
            </Navigator>
        </NavigationContainer>
    );
};

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
    >
        <SafeAreaView
            style={{
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
            }}
        >
            <Layout>
                <DrawerItem
                    title={drawerTitle('Home')}
                    accessoryLeft={(props) => (
                        <Icon
                            {...props}
                            height={30}
                            width={30}
                            animation="pulse"
                            name="home"
                        />
                    )}
                />
                <DrawerItem
                    title={drawerTitle('Profile')}
                    accessoryLeft={(props) => (
                        <Icon
                            {...props}
                            height={30}
                            width={30}
                            animation="pulse"
                            name="person"
                        />
                    )}
                />
                <DrawerItem
                    title={drawerTitle('Settings')}
                    accessoryLeft={(props) => (
                        <Icon
                            {...props}
                            height={30}
                            width={30}
                            animation="pulse"
                            name="settings"
                        />
                    )}
                    PULSE
                />
                <DrawerItem
                    title={drawerTitle('Logout')}
                    accessoryLeft={(props) => (
                        <Icon
                            {...props}
                            height={30}
                            width={30}
                            animation="pulse"
                            name="power"
                        />
                    )}
                />
            </Layout>
        </SafeAreaView>
    </Drawer>
);

const drawerTitle = (title) => {
    return <Text category="h6">{title}</Text>;
};
