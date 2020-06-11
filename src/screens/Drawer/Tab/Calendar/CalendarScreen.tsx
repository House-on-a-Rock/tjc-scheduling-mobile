import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps, CalendarData } from '../../../../shared/models';
import { Carousel, TaskPreview } from '../../../../components/Calender';

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
    const [showPreview, setShowPreview] = useState(false);
    const calCardDatesArray: CalendarData[] = useSelector(
        ({ calendarReducer }) => calendarReducer.data.dateArray,
    );

    return (
        <View style={styles.screen}>
            <View style={styles.scrollContainer}>
                <Carousel data={calCardDatesArray} />
            </View>

            {showPreview ? (
                <View>
                    <TaskPreview />
                </View>
            ) : (
                <View></View>
            )}
        </View>
    );
};
