import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { TaskListScreenProps } from '../../shared/models';
import { Screen } from '../../components/Screen';
import { Text, Layout } from '@ui-kitten/components';
import { openDrawerAction } from '../../shared/components';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskListItem } from '../../components/ListItems/TaskListItem';

import { compareDates } from '../../services/Calendar/helper_functions';

const tasks = [
    {
        church: {
            churchId: 3,
            name: 'Elizabeth',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-21T14:30:00.000Z',
        role: {
            name: 'RE',
        },
        roleId: 4,
        taskId: 5,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-21T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 2,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-22T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 4,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.901Z',
        date: '2020-08-23T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 1,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
];

export const TaskListScreen = (props: TaskListScreenProps) => {
    // const tasks = useSelector((state) => state.taskReducer.tasks);

    const rearrangedTasks = tasks.reduce((acc, task, index) => {
        if (index === 0) return [[task]];
        const prevDate = acc[acc.length - 1][0].date;
        if (compareDates(new Date(prevDate), new Date(task.date))) {
            const temp = [...acc];
            temp[temp.length - 1] = [...temp[temp.length - 1], task];
            return temp;
        } else return [...acc, [task]];
    }, []);

    // const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    // const rightAccessory = () => (
    //     <TouchableOpacity
    //         onPress={() => props.navigation.goBack()}
    //         style={{ flexWrap: 'wrap', paddingRight: 10 }}
    //     >
    //         <Text category={'s1'}> View as</Text>
    //         <Text category={'s1'}>Calendar</Text>
    //     </TouchableOpacity>
    // );

    const renderItem = ({ item }) => <TaskListItem tasks={item} />;

    return (
        <Layout style={styles.container}>
            {tasks.length > 0 ? (
                <FlatList
                    data={rearrangedTasks}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>You have no assignments!</Text>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
});
