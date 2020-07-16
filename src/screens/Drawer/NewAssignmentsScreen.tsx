import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import { Screen } from '../../components';
import { useSelector } from 'react-redux';

export const NewAssignmentsScreen = () => {
    //grab new assignments instead of tasks
    const newAssignments = useSelector((state) => state.taskReducer.tasks);
    console.log('newAssignments', newAssignments);
    return (
        <Screen>
            <Layout style={styles.layout}>
                <Text>New Assignments</Text>
                {/* <FlatList /> */}
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        height: '100%',
    },
});
