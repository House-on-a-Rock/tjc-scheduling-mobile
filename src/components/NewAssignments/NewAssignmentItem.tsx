import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { months } from '../../services/Calendar/models';
import { windowWidth } from '../../shared/constants';

import { Animated, StyleSheet, View, LayoutAnimation } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import SwipeRow from '../SwipeableItem';

interface NewAssignmentItemProps {
    item;
    onSwipe;
}

export const NewAssignmentItem = (props: NewAssignmentItemProps) => {
    // const date: Date = new Date(props.item.date.replace(/-/g, '/'));
    // const dayString: string[] = date.toDateString().split(' ');

    return (
        <View
            style={{
                width: windowWidth * 0.8,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 10,
                margin: 10,
            }}
        >
            {/* <Swipeable renderLeftActions={renderLeftActions}> */}
            <SwipeRow onSwipe={props.onSwipe} swipeThreshold={-150} key={props.item.key}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: props.item.backgroundColor,
                    }}
                >
                    {/* <Text>{date.getDate()}</Text>
                    <Text>{months()[date.getMonth()].name}</Text>
                    <Text category="s1">{dayString[0]}</Text> */}
                    <Text>{props.item.text}</Text>
                </View>
            </SwipeRow>
            {/* </Swipeable> */}
        </View>
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
