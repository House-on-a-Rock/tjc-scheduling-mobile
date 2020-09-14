import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { LoadStateActionTypes } from '../../store/actions';

export const SwapConfirmation = (props) => {
    const requestState = useSelector((state) => state.loadStateReducer.loadStatus.SWAP);

    return (
        <View>
            {requestState === LoadStateActionTypes.LOADED && <Text>Request Sent!</Text>}
            {requestState === LoadStateActionTypes.ERROR && (
                <Text>There was an error sending the request, please try again</Text>
            )}
            <Button onPress={props.route.params.closeModal}>Close</Button>
        </View>
    );
};
