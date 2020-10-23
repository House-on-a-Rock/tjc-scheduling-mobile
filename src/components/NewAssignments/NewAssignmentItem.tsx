import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { months } from '../../services/Calendar/models';
import { windowWidth } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { selectDate } from '../../store/actions';
import { useDispatch } from 'react-redux';

interface NewAssignmentItemProps {
    item;
}

export const NewAssignmentItem = ({ item }: NewAssignmentItemProps) => {
    const dispatch = useDispatch();
    const date: Date = new Date(item.date);
    const dayString: string[] = date.toDateString().split(' ');
    const navigation = useNavigation();

    const onPressHandler = () => {
        dispatch(selectDate(date, item));
        navigation.navigate('TaskDetails', { task: item });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPressHandler}>
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
                {/* <Text>{item.role.name}</Text> */}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        margin: 5,
        alignItems: 'center',
    },
    leftAction: {
        height: 50,
    },
});
