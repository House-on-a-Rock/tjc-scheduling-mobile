import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';
import { states } from '../../store/actions';
import { LoadingScreen, Carousel } from '../../components';

export const CalendarScreen = (props) => {
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    const [loadState, setLoadState] = useState(states.loading); //sets initial state to loading
    useEffect(() => {
        AsyncStorage.getItem('@tjc-scheduling-app:loadState').then((loads) => {
            //if useEffect runs faster than API calls than this will skip the loading screen
            //grabs loadstate from localstorage, and stores it in hook
            setLoadState(loads);
        });
    }); //memory leak from here

    if (loadState === states.loading) return <LoadingScreen />;

    return (
        <View style={styles.screen}>
            <View style={styles.scrollContainer}>
                <Carousel items={calCardDatesArray} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
    },
});
