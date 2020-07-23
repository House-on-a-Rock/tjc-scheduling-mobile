import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ModalHeader } from '../../components/ModalHeader';

export const SwapSummary = (props) => {
    const onConfirmPress = () => {
        props.navigation.navigate('SwapConfirmation');
    };

    return (
        <Layout>
            <ModalHeader
                goBack={props.navigation.goBack}
                closeModal={props.route.params.closeModal}
            />
            <Text>You want to trade with _____ on _____</Text>
            <Button onPress={onConfirmPress}>Confirm</Button>
        </Layout>
    );
};
