import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

interface TitledCardProps {
    children;
    title;
    style?;
}

export const TitledCard = ({ children, title, style }: TitledCardProps) => (
    <View style={{ ...styles.shadow, ...style }}>
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={{ color: 'white' }}>{title}</Text>
            </View>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,

        elevation: 3,
        alignItems: 'center',
    },
    titleBar: {
        height: 33,
        padding: 3,
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
