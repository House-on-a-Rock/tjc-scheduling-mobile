import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Button, Radio, RadioGroup } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setSwapConfig } from '../../store/actions/swapActions';
import { SelectCard } from '../../components/SelectCard';

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

    const bottomRow1 = () => (
        <View style={{ flexDirection: 'row' }}>
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
    );

    const bottomRow2 = () => (
        <View style={{ flexDirection: 'row' }}>
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
    );

    const onCardPress1 = (index) => {
        setSelectedIndex1(index);
    };

    const onCardPress2 = (index) => {
        setSelectedIndex2(index);
    };

    return (
        <Layout style={styles.layout}>
            <Text>Choose an option</Text>

            <View style={styles.cardContainer}>
                <SelectCard
                    displayedText={'Switch duty with someone'}
                    bottomRow={bottomRow1}
                    onPressHandler={onCardPress1}
                    cardIndex={0}
                    selectedIndex={selectedIndex1}
                />
                <SelectCard
                    displayedText="Have your duty replaced"
                    bottomRow={bottomRow2}
                    onPressHandler={onCardPress1}
                    cardIndex={1}
                    selectedIndex={selectedIndex1}
                />
            </View>
            <Text>Is this request for</Text>

            <View style={styles.cardContainer}>
                <SelectCard
                    displayedText="Specific time or person"
                    bottomRow={bottomRow1}
                    onPressHandler={onCardPress2}
                    cardIndex={0}
                    selectedIndex={selectedIndex2}
                />
                <SelectCard
                    displayedText="Anyone, as long as my duty is replaced"
                    bottomRow={bottomRow2}
                    onPressHandler={onCardPress2}
                    cardIndex={1}
                    selectedIndex={selectedIndex2}
                />
            </View>
            <Button style={{}} onPress={onNextHandler}>
                Next
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        padding: 20,
        paddingVertical: 35,
    },
    cardContainer: {
        flexDirection: 'row',
        width: '90%',
        height: '30%',
        paddingVertical: 10,
    },
});
