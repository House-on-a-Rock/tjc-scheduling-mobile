import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { LoadStateActionTypes } from '../../store/actions';
import { Card } from '../../components/Card';

export const SwapConfirmation = (props) => {
    // const requestState = useSelector((state) => state.loadStateReducer.loadStatus.SWAP);
    //TODO: configure error message if request was unsuccessful
    //TODO: missing dove asset

    const onButtonPress = () => {
        props.navigation.navigate('Schedule');
    };
    return (
        <View
            style={{
                backgroundColor: 'rgb(108, 207, 212)',
                flex: 1,
                width: '100%',
                alignItems: 'center',
                paddingTop: 40,
            }}
        >
            {/* {requestState === LoadStateActionTypes.LOADED && <Text>Request Sent!</Text>}
            {requestState === LoadStateActionTypes.ERROR && (
                <Text>There was an error sending the request, please try again</Text>
            )} */}
            {/* <Button onPress={props.route.params.closeModal}>Close</Button> */}
            <Icon name="alert-circle-outline" height={250} width={250} fill="#000" />
            <Card style={{ height: 350, width: '75%' }}>
                <Text>Success!</Text>
                <View>
                    <Text>Your request has been sent!</Text>
                    <Text>Once your request has been</Text>
                    <Text>accepted, you will be notified.</Text>
                    <Text>Return to Schedule</Text>
                </View>
                <Button onPress={onButtonPress} style={{ margin: 10, width: 200 }}>
                    Return to Schedule
                </Button>
            </Card>
        </View>
    );
};
