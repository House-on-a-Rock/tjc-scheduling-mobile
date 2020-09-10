import React, { useState } from 'react';
import {
    Layout,
    Text,
    Autocomplete,
    AutocompleteItem,
    Icon,
} from '@ui-kitten/components';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeRow from '../../components/SwipeableItem';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { windowWidth } from '../../shared/constants';

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
    const deleteThreshold = windowWidth * 0.3;

    const deleteItem = (taskId) => {
        const updatedData = data.filter((d) => d.taskId !== taskId);

        // Animate list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(updatedData);
    };

    const renderItem = ({ item, index }) => (
        <SwipeRow
            swipeThreshold={deleteThreshold}
            onSwipe={deleteItem}
            itemId={item.taskId}
        >
            <NewAssignmentItem item={item} />
        </SwipeRow>
    );

    return (
        <Layout style={styles.layout}>
            <LinearGradient
                colors={['#EDEEF3', '#FFFFFF']}
                style={{ flex: 1, width: '100%', alignItems: 'center' }}
            >
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.taskId.toString()}
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
