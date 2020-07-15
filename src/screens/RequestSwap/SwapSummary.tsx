import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ModalHeader } from '../../components/ModalHeader';

export const SwapSummary = (props) => {
    return (
        <Layout>
            <ModalHeader
                goBack={props.navigation.goBack}
                closeModal={props.route.params.closeModal}
            />
            <Text>You want to trade with _____ on _____</Text>
            <Button>Confirm</Button>
            <Button>Go Back</Button>
        </Layout>
    );
};
