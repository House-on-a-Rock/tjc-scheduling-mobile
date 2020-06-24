import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../../shared/models';
import { LoginScreen, RecoverLoginScreen, SignUpScreen } from '../../screens/index';

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthenticationStack = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator headerMode="none">
                <AuthStack.Screen name="Login" component={LoginScreen} />
                <AuthStack.Screen name="RecoverLogin" component={RecoverLoginScreen} />
                <AuthStack.Screen name="SignUp" component={SignUpScreen} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};
