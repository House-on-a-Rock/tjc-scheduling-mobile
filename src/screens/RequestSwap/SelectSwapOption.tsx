import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button, Radio, RadioGroup } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setSwapConfig } from '../../store/actions/swapActions';

interface SelectSwapOptionProps {
    navigation;
    route;
}

export const SelectSwapOption = (props: SelectSwapOptionProps) => {
    const [selectedIndex1, setSelectedIndex1] = useState(0);
    const [selectedIndex2, setSelectedIndex2] = useState(0);
    const iconDimensions = 25;
    const iconColor = '#000000';
    const dispatch = useDispatch();

    const onNextHandler = () => {
        const swapConfig = {
            choice1: selectedIndex1,
            choice2: selectedIndex2,
        };
        dispatch(setSwapConfig(swapConfig));
        props.navigation.navigate('SwapScreen');
    };

    return (
        <Layout style={styles.layout}>
            <Text>Choose an option</Text>
            <Choice1 />
            <Text>Is this request for</Text>
            <Choice2 />
            <Button onPress={onNextHandler}>Next</Button>
        </Layout>
    );

    function Choice1() {
        return (
            <View style={styles.radioContainer}>
                <RadioGroup
                    selectedIndex={selectedIndex1}
                    onChange={(index) => setSelectedIndex1(index)}
                >
                    <Radio>
                        Switch duty with someone
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
                    </Radio>
                    <Radio>
                        Ask someone to take over
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
                    </Radio>
                </RadioGroup>
            </View>
        );
    }
    function Choice2() {
        return (
            <View style={styles.radioContainer}>
                <RadioGroup
                    selectedIndex={selectedIndex2}
                    onChange={(index) => setSelectedIndex2(index)}
                >
                    <Radio>Specific time or person/people</Radio>
                    <Radio>Anyone, as long as my duty is replaced</Radio>
                </RadioGroup>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        padding: 20,
        paddingVertical: 35,
    },
    radioContainer: {
        flex: 1,
        padding: 10,
        margin: 5,
        backgroundColor: 'white',

        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,

        elevation: 3,
    },
});
