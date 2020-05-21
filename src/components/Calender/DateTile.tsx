import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { TitleText } from 'shared/components';
import { compareDates } from 'services/Calendar/helper_functions';

export const DateTile = (props) => {
    const navigation = useNavigation();
    let TextComponent = props.TextComponent || TitleText; //TODO redo font system
    let month = props.renderedDate.getMonth();
    let year = props.renderedDate.getFullYear();
    let date = props.renderedDate.getDate();
    const currentDate = useSelector((state) => state.calendarReducer.today);
    let isToday = false;
    if (compareDates(currentDate, props.renderedDate)) {
        isToday = true;
    }

    return (
        <TouchableOpacity
            style={
                isToday
                    ? { ...styles.todayTile, ...props.style }
                    : { ...styles.tile, ...props.style }
            }
            onPress={() =>
                navigation.navigate('Tasks', {
                    name: `${month}/${date}/${year}`,
                    taskDetails: props.data,
                })
            }
        >
            <View>
                <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                    {date}
                </TextComponent>
                {props.data.length > 0 ? (
                    <Entypo name="dot-single" size={20} color="black" />
                ) : (
                    <View></View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: 40,
        height: 50,
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
