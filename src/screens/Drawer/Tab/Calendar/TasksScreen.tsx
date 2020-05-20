import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TasksScreenProps } from '../../../../shared/models/screens';

export const TasksScreen = (props: TasksScreenProps) => {
    const route = props.route;
    console.log(route);
    const { taskDetails } = route.params;
    const render = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', flex: 1, borderWidth: 1 }}>
                <Text>{item.church.name}</Text>
                <Text>{item.role.name}</Text>
            </View>
        );
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Your tasks for {route.params.name}</Text>
            <FlatList
                data={taskDetails}
                renderItem={render}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
