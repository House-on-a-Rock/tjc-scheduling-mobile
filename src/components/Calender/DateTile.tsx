import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TitleText } from '../../utils/components';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { compareDates } from './utils/calendarServices';

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
        <View
            style={
                isToday
                    ? { ...styles.todayTile, ...props.style }
                    : { ...styles.tile, ...props.style }
            }
        >
            <TouchableOpacity
                style={{ flex: 1, width: '100%' }}
                onPress={() =>
                    navigation.navigate('Tasks', {
                        name: `${month}/${date}/${year}`,
                        taskDetails: props.data,
                    })
                }
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
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
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    todayTile: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        width: 40,
        height: 50,
        borderBottomWidth: 1,

        backgroundColor: 'rgba(246, 84, 84, 0.36)',
        // borderRadius: 100,
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
