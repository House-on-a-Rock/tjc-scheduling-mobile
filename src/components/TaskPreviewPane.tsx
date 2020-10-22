import React, { useEffect, useRef } from 'react';
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

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('screen').height;
const taskPreviewHeight: number =
    windowHeight - calendarHeight + headerBarHeight + statusBarHeight;

//TODO look into adding swipe down to close pane
export const TaskPreviewPane = () => {
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

    // const onHidePressHandler = () => {
    //     dispatch(selectDate(null, null));
    //     //close animation
    //     Animated.timing(translateY, {
    //         toValue: 1000,
    //         duration: 300,
    //         useNativeDriver: true,
    //     }).start(() => dispatch(hidePreviewPane()));
    // };

    return (
        <Animated.View
            style={{ ...styles.container, transform: [{ translateY: translateY }] }}
        >
            <LinearGradient
                colors={['rgb(100, 220, 220)', 'rgb(222, 246, 246)']}
                style={{ flex: 1, borderRadius: 20, padding: 10 }}
            >
                {/* <View style={styles.layout}>
                    <Button
                        style={{ width: 100, height: 10 }}
                        onPress={onHidePressHandler}
                    >
                        Hide
                    </Button>
                </View> */}
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
