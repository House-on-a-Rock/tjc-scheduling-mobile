import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { days } from '../../utils/models/calendar';

export const DayNameRow = () => {
    const dayNameArray = new Array(7);
    for (let i = 0; i < dayNameArray.length; i++) {
        dayNameArray[i] = (
            <View key={i} style={styles.dayTilesStyle}>
                <Text style={styles.dayText}>{days[i]}</Text>
            </View>
        );
    }
    return <View style={styles.dayNamesContainer}>{dayNameArray}</View>;
};

const styles = StyleSheet.create({
    dayNamesContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    dayTilesStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    dayText: {
        fontFamily: 'Roboto-Bold',
        color: '#6971E2',
        fontSize: 18,
    },
});
