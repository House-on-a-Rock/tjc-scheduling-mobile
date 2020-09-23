import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';

interface SelectCardProps {
    displayedText: string;
    bottomRow;
    onPressHandler?: () => void;
}

export const SelectCard = ({
    displayedText,
    bottomRow,
    cardIndex,
    onPressHandler,
    selectedIndex,
}) => {
    const borderColor = selectedIndex === cardIndex ? 'red' : 'white';
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{ ...selectStyle.selectCard, borderColor: borderColor }}
            onPress={() => onPressHandler(cardIndex)}
        >
            <Text category="s1" style={{ paddingVertical: 5 }}>
                {displayedText}
            </Text>
            {bottomRow()}
        </TouchableOpacity>
    );
};
const selectStyle = StyleSheet.create({
    selectCard: {
        width: '50%',
        height: '100%',
        margin: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
