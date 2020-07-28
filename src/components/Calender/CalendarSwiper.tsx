import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Icon, Layout, Text } from '@ui-kitten/components';

import { View, StyleSheet } from 'react-native';
import { months } from '../../services/Calendar/models';
import { useStringDate } from '../../services/Hooks/useStringDate';
import { selectSwapDate } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

export const CalendarSwiper = (props) => {
    const [displayedDate, setDisplayedDate] = useState(props.displayedDate);
    const [isLeap, year, month] = useStringDate(displayedDate);
    const selectedDate = useSelector((state) => state.swapReducer.swapDate);
    const dispatch = useDispatch();

    const onDateTilePress = (date, data) => {
        console.log('calling ondatetilepress in swiper');
        dispatch(selectSwapDate(date));
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
                <Icon height={50} width={50} name="arrow-left-outline" />
                <Text category="h5">
                    {months(isLeap)[month].name} {year}
                </Text>
                <Icon height={50} width={50} name="arrow-right-outline" />
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
