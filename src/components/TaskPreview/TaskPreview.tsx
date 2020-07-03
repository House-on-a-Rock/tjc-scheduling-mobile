import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, View, FlatList } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    statusBarHeight,
} from '../../shared/constants';
import { TaskItem } from './TaskItem';
import { LinearGradient } from 'expo-linear-gradient';
import { selectDate } from '../../store/actions';

const calendarHeight = calendarCardDimensions.totalHeight;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const taskPreviewHeight =
    windowHeight - (calendarHeight + headerBarHeight + statusBarHeight);

export const TaskPreview = (props) => {
    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate);
    console.log('selectedDate', selectedDate);
    if (!selectedDate) return <View></View>;

    const { date, tasks } = selectedDate;

    const renderItem = (item) => <TaskItem>{item}</TaskItem>;

    const onHidePressHandler = () => {
        dispatch(selectDate(null, null));
    };

    return (
        <Layout
            style={{
                height: taskPreviewHeight,
                width: '100%',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <LinearGradient
                colors={['#EDEEF3', '#FFFFFF']}
                style={{ flex: 1, width: '100%' }}
            >
                <Layout
                    style={{
                        // flexDirection: 'row',
                        backgroundColor: 'transparent',
                        width: '100%',
                    }}
                >
                    <Text style={{ textAlign: 'center' }}>Tasks</Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            textAlign: 'right',
                        }}
                        onPress={onHidePressHandler}
                        appearance="hint"
                    >
                        Hide
                    </Text>
                </Layout>
                {tasks?.length > 0 ? (
                    <FlatList
                        data={tasks}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            width: windowWidth,
                        }}
                    />
                ) : (
                    <Text style={{ textAlign: 'center' }}>You've got no tasks!</Text>
                )}
            </LinearGradient>
        </Layout>
    );
};
