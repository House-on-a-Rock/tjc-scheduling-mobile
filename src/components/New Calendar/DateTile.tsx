import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { dateTileDimensions } from '../../shared/constants';
import { Text } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';

interface DateTileProps {
    day;
    onTilePress?;
    isSelected;
    isCurrentMonth;
    textStyling?;
    hasTask;
}

export const DateTile = (props: DateTileProps) => {
    const { day, isSelected, isCurrentMonth, onTilePress, textStyling, hasTask } = props;
    const TileComponent = isCurrentMonth ? TouchableOpacity : View;
    const styling = isCurrentMonth
        ? isSelected && styles.selectedStyle
        : styles.fadedStyle;

    return (
        <TileComponent
            onPress={() => onTilePress(day)}
            style={{ ...styles.tile, ...styling }}
        >
            <Text style={textStyling}>{day.getDate()}</Text>
            {hasTask && <Entypo name="dot-single" size={20} color="black" />}
        </TileComponent>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    fadedStyle: {
        opacity: 0.3,
    },
    selectedStyle: {
        backgroundColor: 'rgb(120, 224, 56)',
        borderRadius: 100,
    },
});
