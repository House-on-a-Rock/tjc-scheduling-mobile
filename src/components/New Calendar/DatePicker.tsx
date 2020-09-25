import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Button, Icon } from '@ui-kitten/components';
import { Calendar } from './Calendar';
import { calendarCardDimensions } from '../../shared/constants/';

export const DatePicker = ({ onTilePress, selectedDates, initialTasks }) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [displayedMonth, setDisplayedMonth] = useState(new Date());

    const decrementMonth = () =>
        setDisplayedMonth((d) => new Date(d.setMonth(d.getMonth() - 1)));

    const incrementMonth = () =>
        setDisplayedMonth((d) => new Date(d.setMonth(d.getMonth() + 1)));

    const Picker = () => (
        <View style={styles.pickerContainer}>
            <View style={styles.monthSelectionRow}>
                <TouchableOpacity style={styles.button} onPress={decrementMonth}>
                    <Icon
                        name="arrow-ios-back-outline"
                        height={30}
                        width={30}
                        fill="#000000"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={incrementMonth}>
                    <Icon
                        name="arrow-ios-forward-outline"
                        height={30}
                        width={30}
                        fill="#000000"
                    />
                </TouchableOpacity>
            </View>
            <Calendar
                displayedMonth={displayedMonth}
                selectedDates={selectedDates}
                onTilePress={onTilePress}
                initialTasks={initialTasks}
            />
        </View>
    );

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsPickerVisible((d) => !d)}
                style={styles.dropDown}
            >
                <Text category="s1">Date</Text>
                <Icon
                    name="arrow-ios-downward-outline"
                    width={20}
                    height={20}
                    fill="rgb(191, 191, 191)"
                />
            </TouchableOpacity>
            {isPickerVisible && <Picker />}
        </View>
    );
};

function areEqual(prevProps, nextProps) {
    console.log('prevProps', prevProps);
    console.log('nextProps', nextProps);
    return false;
}

const styles = StyleSheet.create({
    dropDown: {
        width: 100,
        height: 40,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'rgb(191, 191, 191)',
        flexDirection: 'row',
        margin: 5,
        backgroundColor: 'rgb(242, 240, 249)',
    },
    pickerContainer: {
        padding: 5,
        width: Dimensions.get('window').width * 0.9,
        height: calendarCardDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',

        //TODO work on positioning this thing
        top: 50,
        left: 10,
        opacity: 1,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    monthSelectionRow: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        position: 'absolute',
        top: 0,
        justifyContent: 'space-between',
        zIndex: 10,
    },
    button: {
        margin: 2,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
