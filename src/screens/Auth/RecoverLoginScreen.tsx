import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
interface RecoverLoginScreenProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export const RecoverLoginScreen: React.FC<RecoverLoginScreenProps> = (props) => {
    return (
        <View>
            <Text>This is the recover login screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
