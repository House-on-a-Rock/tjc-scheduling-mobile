import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    createStackNavigator,
    CardStyleInterpolators,
    TransitionPresets,
    TransitionSpecs,
    HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { SelectSwapOption } from '../../screens/RequestSwap/SelectSwapOption';
import { SwapScreen } from '../../screens/RequestSwap/SwapScreen';

const ReqStack = createStackNavigator();

export const RequestSwapStack = () => {
    const MyTransition = {
        cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
                cardStyle: {
                    opacity: current.progress,
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                        {
                            rotate: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0],
                            }),
                        },
                        {
                            scale: next
                                ? next.progress.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [1, 0.9],
                                  })
                                : 1,
                        },
                    ],
                },
                overlayStyle: {
                    opacity: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5],
                    }),
                },
            };
        },
    };

    return (
        <NavigationContainer>
            <ReqStack.Navigator
                mode="card"
                headerMode={'none'}
                screenOptions={{
                    ...MyTransition,
                }}
            >
                <ReqStack.Screen name="SelectSwapOption" component={SelectSwapOption} />
                <ReqStack.Screen name="SwapScreen" component={SwapScreen} />
            </ReqStack.Navigator>
        </NavigationContainer>
    );
};
