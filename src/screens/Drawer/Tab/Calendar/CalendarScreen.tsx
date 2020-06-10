import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps, CalendarData } from '../../../../shared/models';
import { Carousel, TaskPreview } from '../../../../components/Calender';
import { LoadingPage } from '../../../../components/LoadingPage';
import { loadStateActionTypes } from '../../../../store/actions';

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
    // const dispatch = useDispatch();
    // const [viewHeight, setViewHeight] = useState<number | undefined>(622);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const isCalendarLoaded = useSelector((state) => state.loadStateReducer.loadState);
    const calCardDatesArray: CalendarData[] = useSelector(
        (state) => state.calendarReducer.dateArray,
    );

    if (isCalendarLoaded === loadStateActionTypes.LOADING) {
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
