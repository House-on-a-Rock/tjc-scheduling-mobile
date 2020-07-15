import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectSwapOption } from '../../screens/RequestSwap/SelectSwapOption';
import { SwapScreen, SwapSummary, SwapConfirmation } from '../../screens/RequestSwap/';

const ReqStack = createStackNavigator();

export const RequestSwapStack = (props) => {
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
                <ReqStack.Screen
                    name="SelectSwapOption"
                    component={SelectSwapOption}
                    initialParams={{ closeModal: props.closeModal }}
                />
                <ReqStack.Screen
                    name="SwapScreen"
                    component={SwapScreen}
                    initialParams={{ closeModal: props.closeModal }}
                />
                <ReqStack.Screen
                    name="SwapSummary"
                    component={SwapSummary}
                    initialParams={{ closeModal: props.closeModal }}
                />
                <ReqStack.Screen
                    name="SwapConfirmation"
                    component={SwapConfirmation}
                    initialParams={{ closeModal: props.closeModal }}
                />
            </ReqStack.Navigator>
        </NavigationContainer>
    );
};
