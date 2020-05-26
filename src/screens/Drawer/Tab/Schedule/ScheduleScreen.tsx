import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScheduleScreenProps } from '../../../../shared/models';

export const ScheduleScreen = (props: ScheduleScreenProps) => {
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
