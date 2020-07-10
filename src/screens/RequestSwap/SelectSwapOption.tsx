import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';

export const SelectSwapOption = (props) => {
    const [selectedOption, setSelectedOption] = useState<number>(0);

    const onSelectHandler = (option) => {
        setSelectedOption(option);
    };

    const SwitchSpecifically = () => {
        return (
            <TouchableOpacity
                style={
                    selectedOption === 0
                        ? { ...styles.options, ...styles.selected }
                        : styles.options
                }
                onPress={() => onSelectHandler(0)}
                activeOpacity={1}
            >
                <View>
                    <Text>Switch your duty to a different time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon name="person" height={50} width={50} />
                        <Icon name="swap" height={50} width={50} />
                        <Icon name="person" height={50} width={50} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const SwitchAnyone = () => {
        return (
            <TouchableOpacity
                style={
                    selectedOption === 1
                        ? { ...styles.options, ...styles.selected }
                        : styles.options
                }
                activeOpacity={1}
                onPress={() => onSelectHandler(1)}
            >
                <Text>Ask someone to take over this duty</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon name="person" height={50} width={50} />
                    <Icon name="arrow-forward" height={50} width={50} />
                    <Icon name="person" height={50} width={50} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Layout style={styles.layout}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0 }}
                onPress={props.route.params.closeModal}
            >
                <Icon style={{ width: 50, height: 50 }} name="close-square" />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text>Choose an option</Text>
            </View>
            <SwitchSpecifically />
            <SwitchAnyone />
            <Button
                onPress={() =>
                    props.navigation.navigate('SwapScreen', {
                        selectedOption: selectedOption,
                    })
                }
            >
                Next
            </Button>
        </Layout>
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
    options: {
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
    selected: {
        borderWidth: 1,
        borderColor: 'blue',
    },
});
