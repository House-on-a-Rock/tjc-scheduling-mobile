import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
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
    const { option, date, target } = useSelector((state) => state.swapReducer);

    const onConfirmPress = () => {
        dispatch(sendSwapRequest(option, date, target));
    };

    // || target === null phrase needed to handle error when closing the modal
    const targetName =
        target === undefined || target === null ? 'anyone' : target.row.toString();
    const targetDate = date === undefined || date === null ? 'any day' : date.toString();

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
                    You want to trade with {targetName} on {targetDate}
                </Text>
                <Button onPress={onConfirmPress}>Confirm</Button>
            </View>
        </Layout>
    );
};
