import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, FlatList, StyleSheet, Animated } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    statusBarHeight,
} from '../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskItem } from './ListItems/TaskItem';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { hidePreviewPane } from '../store/actions';
import { coloredBackgroundGradient1, coloredBackgroundGradient2 } from '../ui/colors';

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('screen').height;
const taskPreviewHeight: number =
    windowHeight - calendarHeight + headerBarHeight + statusBarHeight;

//TODO need stuff to display for when there are no tasks? or just blank. also make ts not angry at me
export const TaskPreviewPane = () => {
    const dispatch = useDispatch();
    const defaultSelected = { date: null, tasks: null };
    let selectedDate = useSelector((state) =>
        !!state.calendarReducer.selectedDate
            ? state.calendarReducer.selectedDate
            : defaultSelected,
    );
    const translateY = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: taskPreviewHeight, //need to tweak
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    let { tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskItem item={item} />;

    //added swipe to close functionality
    const gestureHandler = ({ nativeEvent }) => {
        //TODO needing to add these constants is really bad, need to handle diff screen sizes

        const paneHeight = windowHeight - taskPreviewHeight + 75;
        let yPos = nativeEvent.absoluteY - 90; //doesnt track finger well without this offset
        if (yPos < paneHeight) yPos = paneHeight;

        translateY.setValue(yPos);
        if (yPos > windowHeight - 130) dispatch(hidePreviewPane());
    };

    return (
        <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
                style={{ ...styles.container, transform: [{ translateY: translateY }] }}
            >
                <LinearGradient
                    colors={[coloredBackgroundGradient1, coloredBackgroundGradient2]}
                    style={{ flex: 1, borderRadius: 20, padding: 10 }}
                >
                    {tasks?.length > 0 ? (
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={tasks}
                            renderItem={renderItem}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center' }}>You've got no tasks!</Text>
                    )}
                </LinearGradient>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        height: taskPreviewHeight,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    hideText: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: 10,
    },
    layout: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 30,
        alignItems: 'flex-end',
    },
});
