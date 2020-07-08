import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Text, Layout, Button, Icon } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../shared/constants';
import { RequestSwapStack } from '../../navigation/RequestSwap/RequestSwapStack';

export const RequestChangeModal = (props) => {
    const [selectedOption, setSelectedOption] = useState(0);
    return (
        <Modal
            visible={props.modalVisible}
            backdropStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onBackdropPress={props.closeModalHandler}
        >
            {/* <Layout style={styles.modalLayout}>
                <View style={{ position: 'absolute', top: 0, right: 0 }}>
                    <TouchableOpacity onPress={props.closeModalHandler}>
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
            </Layout> */}
            <RequestSwapStack />
            <Text>Hi</Text>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalLayout: {
        height: windowHeight * 0.8,
        width: windowWidth * 0.85,
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
