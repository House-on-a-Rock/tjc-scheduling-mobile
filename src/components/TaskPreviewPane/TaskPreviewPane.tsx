import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, View, FlatList, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    statusBarHeight,
} from '../../shared/constants';
import { TaskPaneItem } from './TaskPaneItem';
import { LinearGradient } from 'expo-linear-gradient';
import { selectDate } from '../../store/actions';

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('window').height;
const taskPreviewHeight: number =
    windowHeight - (calendarHeight + headerBarHeight + statusBarHeight);

export const TaskPreviewPane = (props) => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate);

    if (!selectedDate) return <View></View>;

    const { date, tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskPaneItem item={item} />;

    const onHidePressHandler = () => {
        dispatch(selectDate(null, null));
    };

    return (
        <Layout style={styles.container} opacity={0.9}>
            <LinearGradient colors={['#EDEEF3', '#FFFFFF']} style={{ flex: 1 }}>
                <Layout style={styles.layout}>
                    <Text style={{ textAlign: 'center' }}>Tasks</Text>
                    <Text
                        style={styles.hideText}
                        onPress={onHidePressHandler}
                        appearance="hint"
                    >
                        Hide
                    </Text>
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
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        height: taskPreviewHeight,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
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
    },
});
