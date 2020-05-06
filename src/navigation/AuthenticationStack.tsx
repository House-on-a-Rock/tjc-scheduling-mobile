import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RecoverLoginScreen, SignUpScreen } from '../screens';

const AuthStack = createStackNavigator();

export const AuthenticationStack = () => {
	return (
		<NavigationContainer>
			<AuthStack.Navigator>
				<AuthStack.Screen name="Login" component={LoginScreen} />
				<AuthStack.Screen
					name="RecoverLoginScreen"
					component={RecoverLoginScreen}
				/>
				<AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
			</AuthStack.Navigator>
		</NavigationContainer>
	);
};
