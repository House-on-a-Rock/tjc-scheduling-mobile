import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen, LogOutScreen, SettingsScreen } from '../screens';

const Profile = createStackNavigator();
const LogOut = createStackNavigator();
const Settings = createStackNavigator();

export const ProfileStack = () => {
	return (
		<Profile.Navigator>
			<Profile.Screen name="Profile" component={ProfileScreen} />
		</Profile.Navigator>
	);
};

export const LogOutStack = () => {
	return (
		<LogOut.Navigator>
			<LogOut.Screen name="Log Out" component={LogOutScreen} />
		</LogOut.Navigator>
	);
};

export const SettingsStack = () => {
	return (
		<Settings.Navigator>
			<Settings.Screen name="Settings" component={SettingsScreen} />
		</Settings.Navigator>
	);
};
