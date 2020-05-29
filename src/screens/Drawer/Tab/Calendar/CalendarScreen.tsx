import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps } from '../../../../shared/models';
import { states } from '../../../../store/actions';
import { Carousel, TaskPreview } from '../../../../components/Calender';
import { LoadingPage } from '../../../../components/LoadingPage';

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
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    const tasks = useSelector(({ profileReducer }) => profileReducer.data.tasks);
    const [viewHeight, setViewHeight] = useState<number | undefined>();
    const [loadState, setLoadState] = useState(states.loading); //sets initial state to loading
    const [isDateSelected, setIsDateSelected] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('@tjc-scheduling-app:loadState').then((loads) => {
            //if useEffect runs faster than API calls than this will skip the loading screen
            //grabs loadstate from localstorage, and stores it in hook
            setLoadState(loads);
        });
    }); // memory leak from here

    if (loadState === states.loading) return <LoadingPage />;
    console.log('calCardDatesArray ASDFASDF', calCardDatesArray);

    return (
        <View
            style={styles.screen}
            onLayout={(event) => {
                setViewHeight(event.nativeEvent.layout.height);
            }}
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
};
