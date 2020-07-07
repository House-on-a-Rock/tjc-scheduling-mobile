import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { months } from '../../services/Calendar/models';
import { windowWidth } from '../../shared/constants';

interface TaskListItemProps {
    item;
}

export const TaskListItem = (props: TaskListItemProps) => {
    const date: Date = new Date(props.item.date.replace(/-/g, '/'));
    const dayString: string[] = date.toDateString().split(' ');
    return (
        <TouchableOpacity style={styles.container}>
            <View
                style={{
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <Text category="h3">{date.getDate()}</Text>
            </View>
            <View style={{ flexDirection: 'column', padding: 10, flex: 1 }}>
                <Text>{months()[date.getMonth()].name}</Text>
                <Text category="s1">{dayString[0]}</Text>
            </View>
            <View style={{ flexDirection: 'column', padding: 10, flex: 3 }}>
                <Text>{props.item.role.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
    },
});