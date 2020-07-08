import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../shared/constants';

export const SelectSwapOption = (props) => {
    //onPress={props.closeModalHandler}
    return (
        <Layout style={styles.modalLayout}>
            <View style={{ position: 'absolute', top: 0, right: 0 }}>
                <TouchableOpacity>
                    <Icon name="close-square" height={50} width={50} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <Text>Choose an option</Text>
            </View>
            <TouchableOpacity style={styles.selectOption} activeOpacity={1}>
                <View>
                    <Text>Switch your duty to a different time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="person" height={50} width={50} />
                        <Icon name="swap" height={50} width={50} />
                        <Icon name="person" height={50} width={50} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectOption} activeOpacity={1}>
                <Text>Ask someone to take over this duty</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon name="person" height={50} width={50} />
                    <Icon name="arrow-forward" height={50} width={50} />
                    <Icon name="person" height={50} width={50} />
                </View>
            </TouchableOpacity>
            <Button>Next</Button>
        </Layout>
    );
};
const styles = StyleSheet.create({
    modalLayout: {
        height: windowHeight * 0.8,
        width: windowWidth * 0.85,
        alignItems: 'center',
        padding: 20,
        paddingVertical: 35,
        backgroundColor: 'red',
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
