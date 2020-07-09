import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../shared/constants';
import { Screen } from '../../components/Screen';
import { backAction, closeStackAction } from '../../shared/components/UI_Actions';

export const SwapScreen = (props) => {
    const leftAccessory = () => backAction(props.navigation.goBack);
    const rightAccessory = () =>
        closeStackAction(() => props.navigation.navigate('TaskDetails'));
    return (
        <Screen
            accessoryLeft={leftAccessory}
            accessoryRight={rightAccessory}
            style={{ paddingTop: 0 }}
        >
            <Layout style={styles.layout}>
                <Text>Select Swap Screen</Text>
            </Layout>
        </Screen>
    );
};
const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        paddingVertical: 35,
    },
    selectOption: {
        flexDirection: 'column',
        flex: 2,
        width: '95%',
        alignItems: 'center',
        padding: 15,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
