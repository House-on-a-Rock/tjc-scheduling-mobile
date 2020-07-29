import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated,
    YellowBox,
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

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('window').height;
const taskPreviewHeight: number =
    windowHeight - (calendarHeight + headerBarHeight + statusBarHeight);

export const TaskPreviewPane = () => {
    const defaultSelected = { date: null, tasks: null };
    const dispatch = useDispatch();
    let selectedDate = useSelector((state) =>
        !!state.calendarReducer.selectedDate
            ? state.calendarReducer.selectedDate
            : defaultSelected,
    );
    const transformY = useRef(new Animated.Value(-taskPreviewHeight)).current;

    useEffect(() => {
        //open animation
        Animated.timing(transformY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [transformY]);

    let { date, tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskPaneItem item={item} />;

    const onHidePressHandler = () => {
        dispatch(selectDate(null, null));

        //close animation
        Animated.timing(transformY, {
            toValue: taskPreviewHeight * -1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => dispatch(hidePreviewPane()));
    };

    return (
        <Animated.View style={{ ...styles.container, bottom: transformY }}>
            <LinearGradient colors={['#EDEEF3', '#FFFFFF']} style={{ flex: 1 }}>
                <Layout style={styles.layout}>
                    <Text style={{ textAlign: 'center' }}>Tasks</Text>
                    <View style={styles.hideText}>
                        <Button onPress={onHidePressHandler}>Hide</Button>
                    </View>
                </Layout>
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
    },
});
