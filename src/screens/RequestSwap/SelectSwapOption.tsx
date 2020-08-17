import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { selectSwapOption } from '../../store/actions/swapActions';

interface SelectSwapOptionProps {
    navigation;
    route;
}

export const SelectSwapOption = (props: SelectSwapOptionProps) => {
    const [selectedOption, setSelectedOption] = useState<number>(0);
    const iconDimensions = 50;
    const iconColor = '#8F9BB3';
    const dispatch = useDispatch();

    const SwitchSpecifically = () => {
        return (
            <TouchableOpacity
                style={
                    selectedOption === 0
                        ? { ...styles.options, ...styles.selected }
                        : styles.options
                }
                onPress={() => setSelectedOption(0)}
                activeOpacity={1}
            >
                <View>
                    <Text>Switch your duty to a different time</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Icon
                            name="person"
                            height={iconDimensions}
                            width={iconDimensions}
                            fill={iconColor}
                        />
                        <Icon
                            name="swap"
                            height={iconDimensions}
                            width={iconDimensions}
                            fill={iconColor}
                        />
                        <Icon
                            name="person"
                            height={iconDimensions}
                            width={iconDimensions}
                            fill={iconColor}
                        />
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
                onPress={() => setSelectedOption(1)}
            >
                <Text>Ask someone to take over this duty</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon
                        name="person"
                        height={iconDimensions}
                        width={iconDimensions}
                        fill={iconColor}
                    />
                    <Icon
                        name="arrow-forward"
                        height={iconDimensions}
                        width={iconDimensions}
                        fill={iconColor}
                    />
                    <Icon
                        name="person"
                        height={iconDimensions}
                        width={iconDimensions}
                        fill={iconColor}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const onNextHandler = () => {
        dispatch(selectSwapOption(selectedOption));
        props.navigation.navigate('SwapScreen', {
            selectedOption: selectedOption,
        });
    };

    return (
        <Layout style={styles.layout}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0 }}
                onPress={props.route.params.closeModal}
            >
                <Icon
                    style={{ width: iconDimensions, height: iconDimensions }}
                    name="close-square"
                />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text>Choose an option</Text>
            </View>
            <SwitchSpecifically />
            <SwitchAnyone />
            <Button onPress={onNextHandler}>Next</Button>
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
