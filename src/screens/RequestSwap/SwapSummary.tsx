import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Layout, Text, Button, Input, Icon } from '@ui-kitten/components';

import { useDispatch, useSelector } from 'react-redux';
import { sendSwapRequest } from '../../store/actions/swapActions';
import { LoadingPage } from '../../components/LoadingPage';
import { LoadStateActionTypes } from '../../store/actions';

import { windowHeight } from '../../shared/constants/';

export const SwapSummary = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const loadState = useSelector((state) => state.loadStateReducer.loadStatus.SWAP);
    const errorState = useSelector(
        (state) => state.loadStateReducer.loadErrorStatus.SWAP,
    );
    const { selectedTasks } = route.params;

    // {loadState === LoadStateActionTypes.LOADING && (
    //     <LoadingPage
    //         style={{
    //             height: '100%',
    //             width: '100%',
    //             position: 'absolute',
    //             right: 0,
    //             left: 0,
    //             top: windowHeight / 2 - 30,
    //             paddingTop: 0,
    //         }}
    //         styleSafeArea={{ paddingTop: 0 }}
    //     />
    // )}
    // dispatch(sendSwapRequest(myTask.taskId, targetTask?.taskId, message));

    const iconProps = {
        height: 30,
        width: 30,
        fill: '#000000',
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItem}>
                <Icon name="person-outline" {...iconProps} />
                <Text>
                    {item.user.firstName} {item.user.lastName}
                </Text>
                <View style={{ flexDirection: 'column' }}>
                    <Text>{item.role.name}</Text>
                    <Text>{new Date(item.date).toLocaleDateString('en-US')}</Text>
                </View>
            </View>
        );
    };

    const onPressHandler = () => {
        navigation.navigate('SwapConfirmation');
    };

    return (
        <Layout style={styles.layoutContainer}>
            <View style={styles.textContainer}>
                <Text>Submit a request to the following?</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    renderItem={renderItem}
                    data={selectedTasks}
                    keyExtractor={(item) =>
                        `${item.date} ${item.id} ${item.taskId}summary`
                    }
                    showsVerticalScrollIndicator={false}
                />
                <Button style={styles.button} onPress={onPressHandler}>
                    Submit
                </Button>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    textContainer: {
        height: '25%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(108, 207, 212)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    listItem: {
        width: 330,
        height: 70,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

        borderColor: 'rgb(127, 15, 239)',
        borderWidth: 2,

        margin: 5,
        padding: 4,
    },
    button: {
        margin: 10,
        width: 130,
    },
});
