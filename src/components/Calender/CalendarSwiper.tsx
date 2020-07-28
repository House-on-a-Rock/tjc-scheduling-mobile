import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Icon, Layout, Text } from '@ui-kitten/components';

import { View, StyleSheet } from 'react-native';
import { months } from '../../services/Calendar/models';
import { useStringDate } from '../../services/Hooks/useStringDate';
import { selectSwapDate } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const CalendarSwiper = (props) => {
    const [displayedDate, setDisplayedDate] = useState(props.displayedDate);
    const [isLeap, year, month] = useStringDate(displayedDate);
    const selectedDate = useSelector((state) => state.swapReducer.swapDate);
    const dispatch = useDispatch();

    console.log('displayedDate', displayedDate);

    const onDateTilePress = (date, data) => {
        dispatch(selectSwapDate(date));
    };

    const onArrowPressHandler = (direction) => {
        let newDate = new Date(displayedDate);
        if (direction === 'forward') {
            newDate.setMonth(newDate.getMonth() + 1);
            setDisplayedDate(newDate);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
            setDisplayedDate(newDate);
        }
    };

    return (
        <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={() => onArrowPressHandler('backward')}>
                    <Icon height={50} width={50} name="arrow-left-outline" />
                </TouchableOpacity>

                <Text category="h5">
                    {months(isLeap)[month].name} {year}
                </Text>
                <TouchableOpacity onPress={() => onArrowPressHandler('forward')}>
                    <Icon height={50} width={50} name="arrow-right-outline" />
                </TouchableOpacity>
            </View>
            <Calendar
                displayedDate={displayedDate}
                tasks={[]}
                onDateTilePress={onDateTilePress}
                selectedDate={selectedDate}
            />
        </Layout>
    );
};
