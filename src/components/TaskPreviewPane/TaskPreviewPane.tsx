import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated,
} from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    statusBarHeight,
} from '../../shared/constants';
import { TaskPaneItem } from './TaskPaneItem';
import { LinearGradient } from 'expo-linear-gradient';
import { selectDate, hidePreviewPane } from '../../store/actions';
import { Card } from '../Card';

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('screen').height;
const taskPreviewHeight: number =
    windowHeight - calendarHeight + headerBarHeight + statusBarHeight;

export const TaskPreviewPane = () => {
    const defaultSelected = { date: null, tasks: null };
    const dispatch = useDispatch();
    let selectedDate = useSelector((state) =>
        !!state.calendarReducer.selectedDate
            ? state.calendarReducer.selectedDate
            : defaultSelected,
    );
    const transformY = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        Animated.timing(transformY, {
            toValue: taskPreviewHeight, //taskPreviewHeight + 110, //100 seems to work, works on a smaller android phone too
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [transformY]);

    let { date, tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskPaneItem item={item} />;

    const onHidePressHandler = () => {
        dispatch(selectDate(null, null));

        //close animation
        Animated.timing(transformY, {
            // toValue: windowHeight,
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start(() => dispatch(hidePreviewPane()));
    };

    return (
        <Animated.View
            style={{ ...styles.container, transform: [{ translateY: transformY }] }}
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
