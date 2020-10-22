import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    optionCardBorderColor,
    optionCardShadowColorHighlighted,
    optionCardShadowColorNeutral,
} from '../ui/colors';

interface SelectCardProps {
    displayedText;
    bottomRow;
    cardIndex;
    onPressHandler;
    selectedIndex;
}

//TODO setup icon
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
            <Text category="h2" style={{ paddingVertical: 5 }}>
                {displayedText}
            </Text>
            {bottomRow()}
        </TouchableOpacity>
    );
};
const selectStyle = StyleSheet.create({
    selectCard: {
        width: 300,
        height: 73,
        marginVertical: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 5,
        alignItems: 'center',

        shadowColor: optionCardShadowColorNeutral,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 18 / 2,

        elevation: 5,
    },
    selected: {
        borderColor: optionCardBorderColor,
        borderWidth: 3,
        padding: 2,
        shadowColor: optionCardShadowColorHighlighted, //hard to see this shadow on ios
        shadowRadius: 23 / 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0,
            width: 2,
        },
    },
});
