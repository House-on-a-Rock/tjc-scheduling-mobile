import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { windowWidth } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { selectDate } from '../../store/actions';
import { useDispatch } from 'react-redux';

interface NotificationItemProps {
    item;
    navigation;
}

//TODO load picture of user that created notification
//display correct buttons to handle requests
//determine how long ago notification was created
//on tap of notification, take them to appropriate page

const fakeTask = {
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
};

export const NotificationItem = ({ item, navigation }: NotificationItemProps) => {
    const dispatch = useDispatch();

    const onPressHandler = () => {
        //navigate to screen depending on what the notification is linked to
        //task --> task details done
        //request --> request details
        //? anything else
        navigation.navigate('TaskDetails', { task: fakeTask });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPressHandler}>
            <View
                style={{
                    paddingLeft: 30,
                    justifyContent: 'center',
                }}
            >
                <Text>{item.message}</Text>
                <Text>Theres a notification here ok?</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: 'white',

        marginVertical: 3,
        alignItems: 'center',
    },
    leftAction: {
        height: 50,
    },
});
