import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectSwapOption } from '../../screens/RequestSwap/SelectSwapOption';

const ReqStack = createStackNavigator();

export const RequestSwapStack = () => {
    return (
        <NavigationContainer>
            <ReqStack.Navigator headerMode="none">
                <ReqStack.Screen name="ChooseOption" component={SelectSwapOption} />
            </ReqStack.Navigator>
        </NavigationContainer>
    );
};
