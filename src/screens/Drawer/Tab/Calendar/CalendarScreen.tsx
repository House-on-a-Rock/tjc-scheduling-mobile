import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';
import { states } from '../../../../store/actions';
import { LoadingScreen, Carousel } from '../../../../components';
import { CalendarScreenProps } from '../../../../navigation/models';

export const CalendarScreen = (props: CalendarScreenProps) => {
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    let cardWidth = Dimensions.get('window').width;
    const profile = useSelector((state) => state.profileReducer.profile);
    const [loadState, setLoadState] = useState(states.loading);
    useEffect(() => {
        AsyncStorage.getItem('@tjc-scheduling-app:loadState').then((loads) => {
            setLoadState(loads);
        });

        let d = new Date(profile.tasks[0].date) || 1;
    }); //memory leak from here pbly

    return (
        <View style={styles.screen}>
            {loadState === states.loading ? (
                <LoadingScreen opacity={0.97} />
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
