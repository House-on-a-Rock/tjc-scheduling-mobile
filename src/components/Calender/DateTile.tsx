import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BodyText, TitleText } from '../../utils';

export const DateTile = (props) => {
    let TextComponent = props.TextComponent || TitleText;

    // useEffect(() => {
    // 	TextComponent = props.textComponent || BodyText;
    // 	ViewComponent = props.viewComponent || TouchableOpacity;
    // });

    // console.log('TextComponent', TextComponent);
    // console.log('ViewComponent', ViewComponent);

    return (
        <TouchableOpacity
            style={{ ...styles.tile, ...props.style }}
            onPress={props.onPress}
        >
            <View>
                <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                    {props.title}
                </TextComponent>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: '100%',
        height: 50,
        borderColor: '#C6C6C6',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
