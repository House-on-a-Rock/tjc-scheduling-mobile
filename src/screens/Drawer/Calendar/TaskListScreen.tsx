import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TaskListScreenProps } from '../../../shared/models';
import { Screen } from '../../../components/Screen';
import { Text, Layout } from '@ui-kitten/components';
import { openDrawerAction } from '../../../shared/components';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskListItem } from '../../../components/TaskList/TaskListItem';

export const TaskListScreen = (props: TaskListScreenProps) => {
    const tasks = useSelector((state) => state.taskReducer.tasks);

    const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    const rightAccessory = () => (
        <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ flexWrap: 'wrap', paddingRight: 10 }}
        >
            <Text category={'s1'}> View as</Text>
            <Text category={'s1'}>Calendar</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => <TaskListItem item={item} />;

    return (
        <Screen
            title={() => (
                <Text category="h3" status="basic">
                    My Duties
                </Text>
            )}
            accessoryRight={rightAccessory}
            accessoryLeft={leftAccessory}
        >
            <Layout style={styles.container}>
                <LinearGradient colors={['#EDEEF3', '#FFFFFF']} style={styles.container}>
                    {tasks.length > 0 ? (
                        <FlatList
                            data={tasks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text>You have no assignments!</Text>
                    )}
                </LinearGradient>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});
