import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export const TasksScreen = ({ route }) => {
    const { taskDetails } = route.params;
    const render = ({ item }) => {
        console.log('item', item);
        return (
            <View>
                <Text>{item.date}</Text>
                <Text>{item.church.name}</Text>
                <Text>{item.role.name}</Text>
            </View>
        );
    };

    return (
        <View>
            <Text>This is the date detail screen</Text>
            <FlatList
                data={taskDetails}
                renderItem={render}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
