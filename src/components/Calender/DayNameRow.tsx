import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AbbrevDays } from 'services/Calendar/models';

export const DayNameRow = () => {
    const dayNameArray = new Array(7);
    for (let i = 0; i < dayNameArray.length; i++) {
        dayNameArray[i] = (
            <View key={i} style={styles.tiles}>
                <Text style={styles.text}>{AbbrevDays[i]}</Text>
            </View>
        );
    }
    return <View style={styles.container}>{dayNameArray}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 20,
    },
    tiles: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
    },
    text: {
        fontFamily: 'Roboto-Bold',
        color: '#6971E2',
        fontSize: 18,
    },
});
