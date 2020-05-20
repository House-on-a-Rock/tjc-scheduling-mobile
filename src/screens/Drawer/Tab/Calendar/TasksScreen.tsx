import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TasksScreenProps } from '../../../../navigation/models';

export const TasksScreen = (props: TasksScreenProps) => {
    return (
        <View>
            <Text>This is the tasks detail screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
