import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps } from '../../../../shared/models';
import { states } from '../../../../store/actions';
import { Carousel, TaskPreview } from '../../../../components/Calender';
import { LoadingPage } from '../../../../components/LoadingPage';
import { LinearGradient } from 'expo-linear-gradient';

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

export const CalendarScreen = (props: CalendarScreenProps) => {
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    const [viewHeight, setViewHeight] = useState<number | undefined>();
    const [loadState, setLoadState] = useState(states.loading); //sets initial state to loading
    const [isDateSelected, setIsDateSelected] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem('@tjc-scheduling-app:loadState').then((loads) => {
            //if useEffect runs faster than API calls than this will skip the loading screen
            //grabs loadstate from localstorage, and stores it in hook
            setLoadState(loads);
        });
    }); //memory leak from here

    if (loadState === states.loading) return <LoadingPage />;

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
                <TaskPreview />
            ) : (
                <LinearGradient
                    colors={['rgba(0,0,0,0.2)', 'transparent']}
                    start={[0, 1]}
                    end={[0, 0]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: viewHeight - 400 || 0,
                    }}
                />
                // <View></View>
            )}
        </View>
    );
};
