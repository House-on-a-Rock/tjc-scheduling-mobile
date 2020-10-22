import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CardProps {
    style?;
    children;
}

export const Card = (props: CardProps) => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        height: '100%',
        width: '100%',

        borderRadius: 30,
        backgroundColor: 'white',

        padding: 20,
        margin: 10,
        justifyContent: 'space-around',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
