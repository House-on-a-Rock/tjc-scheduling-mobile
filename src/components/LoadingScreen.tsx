import { View, ActivityIndicator, ViewProps } from 'react-native';
import React from 'react';

export const LoadingScreen = (props) => {
    return (
        <View
            style={{
                ...{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: props.opacity,
                },
            }}
        >
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
};
