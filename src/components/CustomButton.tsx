import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
interface CustomButtonProps {
    text: string;
    styling;
    // styling: { height; width; backgroundColor };
    onPress: () => void;
}

export const CustomButton = ({ text, styling, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={{ ...styles.main, ...styling }} onPress={onPress}>
            <Text style={{ color: 'white' }}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#2F3E83',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5 / 2,

        elevation: 5,
    },
});
