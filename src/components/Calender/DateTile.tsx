import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TitleText } from '../../utils/components';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export const DateTile = (props) => {
    const navigation = useNavigation();
    let TextComponent = props.TextComponent || TitleText;
    let month = props.renderedDate.getMonth();
    let year = props.renderedDate.getFullYear();
    let date = props.renderedDate.getDate();
    const currentDate = useSelector((state) => state.calendarReducer.today);

    if (
        currentDate.getMonth() === month &&
        currentDate.getDate() === date &&
        currentDate.getFullYear() === year
    ) {
        //highlights current date
        return (
            <TouchableOpacity
                style={{ ...styles.todayTile, ...props.style }}
                onPress={props.onPress}
            >
                <View>
                    <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                        {date}
                    </TextComponent>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={{ ...styles.tile, ...props.style }}
                onPress={() => navigation.navigate('Tasks')}
            >
                <View>
                    <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                        {date}
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

        backgroundColor: 'rgba(246, 84, 84, 0.36)',
        borderRadius: 100,
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
