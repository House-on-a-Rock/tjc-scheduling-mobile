import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarScreenProps, CalendarData } from '../../../../shared/models';
import { Carousel, TaskPreview } from '../../../../components/Calender';
import { LoadingPage } from '../../../../components/LoadingPage';
import { createCalendar } from '../../../../store/actions';

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
});

export const CalendarScreen = (props: CalendarScreenProps) => {
    const dispatch = useDispatch();
    const [viewHeight, setViewHeight] = useState<number | undefined>(622);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const calCardDatesArray: CalendarData[] = useSelector((state) => {
        if (!state.calendarReducer.data) dispatch(createCalendar());
        else return state.calendarReducer.data.dateArray;
    });

    if (!calCardDatesArray) {
        return <LoadingPage />;
    } else {
        return (
            <View
                style={styles.screen}
                // onLayout={(event) => {
                //     setViewHeight(event.nativeEvent.layout.height);
                // }}
            >
                <View style={styles.scrollContainer}>
                    <Carousel items={calCardDatesArray} />
                </View>

                {isDateSelected ? (
                    <View>
                        <TaskPreview />
                    </View>
                ) : (
                    <View></View>
                )}
            </View>
        );
    }
};
