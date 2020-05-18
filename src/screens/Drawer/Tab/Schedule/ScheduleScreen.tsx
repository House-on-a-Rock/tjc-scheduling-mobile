import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ScheduleScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>This is the schedule screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 10,
        height: '100%',
        width: '100%',
    },
});
