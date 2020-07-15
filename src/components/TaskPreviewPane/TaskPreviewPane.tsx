import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Dimensions,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Animated,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    statusBarHeight,
} from '../../shared/constants';
import { TaskPaneItem } from './TaskPaneItem';
import { LinearGradient } from 'expo-linear-gradient';
import { selectDate, hidePreviewPane } from '../../store/actions';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const calendarHeight: number = calendarCardDimensions.totalHeight;
const windowHeight: number = Dimensions.get('window').height;
const taskPreviewHeight: number =
    windowHeight - (calendarHeight + headerBarHeight + statusBarHeight);

export const TaskPreviewPane = (props) => {
    const defaultSelected = { date: null, tasks: null };
    const dispatch = useDispatch();
    let selectedDate = useSelector((state) => state.calendarReducer.selectedDate);
    if (selectedDate === null) selectedDate = defaultSelected; //handles error with line 34 when selectedDate returns null
    const transformY = useRef(new Animated.Value(taskPreviewHeight * -1)).current;

    useEffect(() => {
        Animated.timing(transformY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [transformY]);

    const { date, tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskPaneItem item={item} />;

    const onHidePressHandler = () => {
        dispatch(selectDate(null, null));
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
                    <TouchableOpacity //replace with button later?
                        onPress={onHidePressHandler}
                        style={styles.hideText}
                    >
                        <Text style={styles.hideText} appearance="hint">
                            Hide
                        </Text>
                    </TouchableOpacity>
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
