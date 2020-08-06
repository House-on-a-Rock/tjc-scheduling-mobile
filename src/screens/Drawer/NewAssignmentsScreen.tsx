import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    View,
} from 'react-native';
import { Screen } from '../../components';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { openDrawerAction } from '../../shared/components';
import SwipeRow from '../../components/SwipeableItem';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { windowWidth } from '../../shared/constants';

interface NewAssignmentsScreenProps {
    route;
    navigation;
    onSwipe;
}

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const NewAssignmentsScreen = (props: NewAssignmentsScreenProps) => {
    //grab new assignments instead of tasks
    const newAssignments = useSelector((state) => state.taskReducer.tasks);

    const [data, setData] = useState(newAssignments);

    const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    const rightAccessory = () => (
        //delete needs to communicate to server as well, to mark them as seen
        <TouchableOpacity onPress={() => setData([])}>
            <Text category="s1">Delete all</Text>
            <Text category="s1">updates</Text>
        </TouchableOpacity>
    );

    const deleteItem = (taskId) => {
        const updatedData = data.filter((d) => d.taskId !== taskId);

        // Animate list to close gap when item is deleted
        const nextLayout = LayoutAnimation.create(
            250,
            'opacity',
            LayoutAnimation.Properties.opacity,
        );
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(updatedData);
    };

    const deleteThreshold = windowWidth * 0.5;

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
        <Screen
            title={() => <Text category="h5">New Assignments</Text>}
            accessoryLeft={leftAccessory}
            accessoryRight={rightAccessory}
        >
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
        </Screen>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32,
        flex: 1,
        textAlign: 'center',
        padding: 25,
    },
});
