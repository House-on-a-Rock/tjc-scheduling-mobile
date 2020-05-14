import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Carousel } from '../components/Calender';
import { useSelector } from 'react-redux';
import { states } from '../store/actions';
import { LoadingScreen } from '../components';

export const CalendarScreen = (props) => {
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    let cardWidth = Dimensions.get('window').width;
    const profile = useSelector((state) => state.profileReducer.profile);
    const [loadState, setLoadState] = useState(states.loading);
    useEffect(() => {
        AsyncStorage.getItem('@tjc-scheduling-app:loadState').then((loads) => {
            setLoadState(loads);
        });
        console.log('profile', profile);
        let d = new Date(profile.tasks[0].date) || 1;
        console.log(d);
    }); //memory leak from here pbly

    return (
        <View style={styles.screen}>
            {loadState === states.loading ? (
                <LoadingScreen />
            ) : (
                <View
                    style={styles.scrollContainer}
                    onLayout={(event) => {
                        cardWidth = event.nativeEvent.layout.width;
                    }}
                >
                    <Carousel items={calCardDatesArray} viewWidth={cardWidth} />
                </View>
            )}
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
        height: '90%',
    },
});
