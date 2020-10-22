import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

interface SelectCardProps {
    displayedText;
    bottomRow;
    cardIndex;
    onPressHandler;
    selectedIndex;
}

export const SelectCard = ({
    displayedText,
    bottomRow,
    cardIndex,
    onPressHandler,
    selectedIndex,
}: SelectCardProps) => {
    const style =
        selectedIndex === cardIndex
            ? { ...selectStyle.selectCard, ...selectStyle.selected }
            : selectStyle.selectCard;
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={style}
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
        width: '100%',
        height: 80,
        marginVertical: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 5,
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
    selected: {
        borderColor: 'rgb(40, 224, 224)',
        borderWidth: 2,
        padding: 3,
    },
});
