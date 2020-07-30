import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ModalHeader } from '../../components/ModalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { sendSwapRequest } from '../../store/actions/swapActions';

export const SwapSummary = (props) => {
    const dispatch = useDispatch();

    const { swapOption, swapDate, swapTarget } = useSelector(
        (state) => state.swapReducer,
    );

    const onConfirmPress = () => {
        dispatch(sendSwapRequest(swapOption, swapDate, swapTarget));
        props.navigation.navigate('SwapConfirmation');
    };

    const swapTargetString =
        swapTarget === undefined || swapTarget === null ? 'anyone' : swapTarget.row;
    const swapTargetDate =
        swapDate === undefined || swapDate === null ? 'any day' : swapDate.toString();

    return (
        <Layout>
            <ModalHeader
                goBack={props.navigation.goBack}
                closeModal={props.route.params.closeModal}
            />
            <Text>
                You want to trade with {swapTargetString} on {swapTargetDate}
            </Text>
            <Button onPress={onConfirmPress}>Confirm</Button>
        </Layout>
    );
};
