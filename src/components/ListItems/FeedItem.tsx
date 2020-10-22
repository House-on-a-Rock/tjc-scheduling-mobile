import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { windowWidth } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { selectDate } from '../../store/actions';
import { useDispatch } from 'react-redux';

interface FeedItemProps {
    item;
}

export const FeedItem = ({ item }: FeedItemProps) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPressHandler = () => {
        //navigate to screen depending on what the notification is linked to
        //task --> task details
        //
        //request --> request details
        //? anything else
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPressHandler}>
            <View
                style={{
                    paddingLeft: 30,
                    justifyContent: 'center',
                }}
            >
                {/* <Text category="p1">{item.task.role.name}</Text>
                <Text category="p2">{item.task.date.toString()}</Text>
                <Text category="p2">{item.message}</Text> */}
                <Text>Theres a notification here ok?</Text>
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
