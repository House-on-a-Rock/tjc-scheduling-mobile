import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TitleText } from '../../utils/components';
import { useSelector } from 'react-redux';

export const DateTile = (props) => {
    let TextComponent = props.TextComponent || TitleText;
    let month = props.displayedDate.getMonth();
    let year = props.displayedDate.getFullYear();
    let date = new Date(year, month, props.title);
    const currentDate = useSelector((state) => state.calendarReducer.today);

    if (currentDate.getMonth() === month && currentDate.getDate() === props.title) {
        //add square around
        return (
            <TouchableOpacity
                style={{ ...styles.todayTile, ...props.style }}
                onPress={props.onPress}
            >
                <View>
                    <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                        {props.title}
                    </TextComponent>
                </View>
            </TouchableOpacity>
        );
    } else {
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
    }
};

const styles = StyleSheet.create({
    tile: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todayTile: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        width: 40,
        height: 40,
        // borderWidth: 1,
        // borderColor: 'black',
        backgroundColor: 'rgba(220, 44, 44, 0.36)',
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
