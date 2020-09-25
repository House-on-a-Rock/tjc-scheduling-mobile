import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { dateTileDimensions } from '../../shared/constants';
import { Text } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';

interface DateTileProps {
    day;
    onTilePress?;
    styling?;
    textStyling?;
    hasTask;
}

export const DateTile = React.memo(
    ({ day, styling, onTilePress, textStyling, hasTask }: DateTileProps) => (
        <TouchableOpacity
            onPress={() => onTilePress(day)}
            style={{ ...styles.tile, ...styling }}
        >
            <Text style={textStyling}>{day.getDate()}</Text>
            {hasTask && <Entypo name="dot-single" size={20} color="black" />}
        </TouchableOpacity>
    ),

    areEqual,
);

function areEqual(prevProps, nextProps) {
    console.log('prev', prevProps);
    console.log('next', nextProps);
    return true;
}

const styles = StyleSheet.create({
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
