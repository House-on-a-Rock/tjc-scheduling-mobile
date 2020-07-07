import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';

type TaskViewProps = {
    item;
};

export const TaskPaneItem = (props: TaskViewProps) => {
    const { date, church, role } = props.item;

    return (
        <Layout style={{ ...styles.proto, ...styles.container }}>
            <TouchableOpacity style={{ ...styles.proto, ...styles.taskContainer }}>
                <Entypo name="dot-single" size={20} color="black" />
                <Text>{role?.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.proto, ...styles.timeContainer }}>
                <Text>{church?.name}</Text>
            </TouchableOpacity>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#C8C8C8',
    },
    taskContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        height: '100%',
        paddingLeft: 30,
    },
    timeContainer: {
        borderLeftWidth: 1,
        borderColor: '#C8C8C8',
        height: '100%',
    },
    proto: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
});