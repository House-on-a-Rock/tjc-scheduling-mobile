import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { months } from '../../services/Calendar/models';
import { windowWidth } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

interface NewAssignmentItemProps {
    item;
}

export const NewAssignmentItem = (props: NewAssignmentItemProps) => {
    const date: Date = new Date(props.item.date);
    const dayString: string[] = date.toDateString().split(' ');
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Task Details', { task: props.item })}
        >
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
    leftAction: {
        height: 50,
    },
});
