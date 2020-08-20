import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { ModalHeader } from '../../components/ModalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { sendSwapRequest } from '../../store/actions/swapActions';
import { LoadingPage } from '../../components/LoadingPage';
import { loadStateActionTypes } from '../../store/actions';

import { windowHeight } from '../../shared/constants/';

export const SwapSummary = (props) => {
    const dispatch = useDispatch();

    const loadState = useSelector((state) => state.loadStateReducer.loadStatus.SWAP);
    const errorState = useSelector(
        (state) => state.loadStateReducer.loadErrorStatus.SWAP,
    );
    const { myTask, targetTask } = useSelector((state) => state.swapReducer);

    // || target === null phrase needed to handle error when closing the modal
    const targetName =
        targetTask === undefined || targetTask === null
            ? 'anyone'
            : `${targetTask.user.firstName} ${targetTask.user.lastName}`;
    const targetDate =
        targetTask === undefined || targetTask === null
            ? 'any day'
            : targetTask.date.toString();

    const myTaskRole = myTask?.role.name;
    const myTaskDate = myTask?.date;
    const defaultMessage =
        targetName === 'anyone'
            ? `Hi, I'd like to swap ${myTaskRole} on ${myTaskDate}, would you be able to switch with me?`
            : `Hi ${targetTask.user.firstName}, I'd like to swap ${myTaskRole} on ${myTaskDate} with you on ${targetDate}`;

    const [message, setMessage] = useState<string>(defaultMessage);

    const onConfirmPress = () => {
        dispatch(sendSwapRequest(myTask.taskId, targetTask?.taskId, message));
    };

    if (
        loadState === loadStateActionTypes.LOADED ||
        loadState === loadStateActionTypes.ERROR
    ) {
        props.navigation.navigate('SwapConfirmation');
    }

    return (
        <Layout>
            {loadState === loadStateActionTypes.LOADING && (
                <LoadingPage
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        right: 0,
                        left: 0,
                        top: windowHeight / 2 - 30,
                        paddingTop: 0,
                    }}
                    styleSafeArea={{ paddingTop: 0 }}
                />
            )}
            <View opacity={loadState === loadStateActionTypes.LOADING ? 0.5 : 1}>
                <ModalHeader
                    goBack={props.navigation.goBack}
                    closeModal={props.route.params.closeModal}
                />
                <Text>
                    You want to trade {myTaskRole} on {myTaskDate} with {targetName} on{' '}
                    {targetDate}
                </Text>
                <Text>Message: </Text>
                <Input
                    value={message}
                    onChangeText={(nextValue) => setMessage(nextValue)}
                    multiline={true}
                />
                <Button onPress={onConfirmPress}>Confirm</Button>
            </View>
        </Layout>
    );
};
