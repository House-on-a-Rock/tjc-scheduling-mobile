import { View, ActivityIndicator } from 'react-native';
import React from 'react';

export const LoadingScreen = (props) => {
    return (
        <View
            opacity={props.opacity}
            style={{
                ...{ flex: 1, justifyContent: 'center', alignItems: 'center' },
                ...props.style,
            }}
        >
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
};