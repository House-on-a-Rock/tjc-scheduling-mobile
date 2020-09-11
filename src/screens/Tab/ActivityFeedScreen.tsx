import React, { useState, useRef } from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import {
    FlatList,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
// import SwipeRow from '../../components/SwipeableItem';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { windowWidth } from '../../shared/constants';
import Swipeable from '../../components/Swipeable';

interface ActivityFeedProps {
    route;
    navigation;
    onSwipe;
}

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ActivityFeedScreen = (props: ActivityFeedProps) => {
    //grab new assignments instead of tasks
    const newAssignments = useSelector((state) => state.taskReducer.tasks);
    const [data, setData] = useState(newAssignments);
    const [isScrollable, setIsScrollable] = useState(true);
    const deleteThreshold = windowWidth * 0.3;

    const leftIcon = () => {
        return <Icon height={20} width={20} name="trash-2-outline" fill="#000000" />;
    };

    const toggleScrollable = (n) => {
        setIsScrollable(n);
    };

    const deleteItem = (taskId) => {
        const updatedData = data.filter((d) => d.taskId !== taskId);

        // Animate list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(updatedData);
    };

    const renderItem = ({ item, index }) => (
        <Swipeable
            swipeThreshold={deleteThreshold}
            onSwipe={deleteItem}
            itemId={item.taskId}
            toggleScrollParent={toggleScrollable}
            leftIcon={leftIcon}
        >
            <NewAssignmentItem item={item} />
        </Swipeable>
    );

    return (
        <Layout style={styles.layout}>
            <LinearGradient
                colors={['#EDEEF3', '#FFFFFF']}
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.taskId.toString()}
                        scrollEnabled={isScrollable}
                        decelerationRate={0.1}
                    />
                ) : (
                    <Text>You don't have any new assignments!</Text>
                )}
            </LinearGradient>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
});
