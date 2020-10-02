import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectSwapOption } from '../../screens/RequestSwap/SelectSwapOption';
import { SwapScreen, SwapSummary, SwapConfirmation } from '../../screens/RequestSwap/';

interface RequestSwapStackProps {
    closeModal: () => void;
}

const ReqStack = createStackNavigator();

//unused now, will remove later if confirmed unneeded
export const RequestSwapStack = (props: RequestSwapStackProps) => {
    //animation for every screen in this stack
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

    const initialParams = {
        closeModal: props.closeModal,
    };

    return (
        // <NavigationContainer>
        <ReqStack.Navigator
            mode="card"
            headerMode={'none'}
            //comments make the red go away
            // screenOptions={{
            //     ...MyTransition,
            // }}
        >
            <ReqStack.Screen
                name="SelectSwapOption"
                component={SelectSwapOption}
                initialParams={initialParams}
            />
            <ReqStack.Screen
                name="SwapScreen"
                component={SwapScreen}
                initialParams={initialParams}
            />
            <ReqStack.Screen
                name="SwapSummary"
                component={SwapSummary}
                initialParams={initialParams}
            />
            <ReqStack.Screen
                name="SwapConfirmation"
                component={SwapConfirmation}
                initialParams={initialParams}
            />
        </ReqStack.Navigator>
        // </NavigationContainer>
    );
};
