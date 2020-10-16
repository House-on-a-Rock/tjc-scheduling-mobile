import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setSwapConfig } from '../../store/actions/swapActions';
import { SelectCard } from '../../components/SelectCard';
import { CustomButton, buttonTypes } from '../../components/CustomButton';

interface SelectSwapOptionProps {
    navigation;
    route;
}

export const SelectSwapOption = (props: SelectSwapOptionProps) => {
    //TODO hook up these choices to do their intended purpose
    const [selectedIndex1, setSelectedIndex1] = useState(0);
    const [selectedIndex2, setSelectedIndex2] = useState(0);

    const iconSettings = {
        height: 25,
        width: 25,
        fill: '#000000',
    };
    const dispatch = useDispatch();

    const onNextHandler = () => {
        const swapConfig = {
            choice1: selectedIndex1,
            choice2: selectedIndex2,
        };
        dispatch(setSwapConfig(swapConfig));
        props.navigation.navigate('SwapScreen');
    };

    const iconSet1 = () => (
        <View style={{ flexDirection: 'row' }}>
            <Icon name="person" {...iconSettings} />
            <Icon name="swap" {...iconSettings} />
            <Icon name="person" {...iconSettings} />
        </View>
    );

    const iconSet2 = () => (
        <View style={{ flexDirection: 'row' }}>
            <Icon name="person" {...iconSettings} />
            <Icon name="arrow-forward" {...iconSettings} />
            <Icon name="person" {...iconSettings} />
        </View>
    );

    const iconSet3 = () => <Icon name="person" {...iconSettings} />;

    const iconSet4 = () => (
        <View style={{ flexDirection: 'row' }}>
            <Icon name="person" {...iconSettings} />
            <Icon name="person" {...iconSettings} />
            <Icon name="person" {...iconSettings} />
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
            <View style={styles.cardContainer}>
                <Text>Would you like to</Text>
                <SelectCard
                    displayedText={'Switch duty with someone'}
                    bottomRow={iconSet1}
                    onPressHandler={onCardPress1}
                    cardIndex={0}
                    selectedIndex={selectedIndex1}
                />
                <SelectCard
                    displayedText="Have your duty replaced"
                    bottomRow={iconSet2}
                    onPressHandler={onCardPress1}
                    cardIndex={1}
                    selectedIndex={selectedIndex1}
                />
            </View>

            <View style={styles.cardContainer}>
                <Text>Is this request for</Text>
                <SelectCard
                    displayedText="Specific time or person"
                    bottomRow={iconSet3}
                    onPressHandler={onCardPress2}
                    cardIndex={0}
                    selectedIndex={selectedIndex2}
                />
                <SelectCard
                    displayedText="Anyone, as long as my duty is replaced"
                    bottomRow={iconSet4}
                    onPressHandler={onCardPress2}
                    cardIndex={1}
                    selectedIndex={selectedIndex2}
                />
            </View>
            <CustomButton
                type={buttonTypes.CONFIRM}
                styling={{ height: 57, width: 300 }}
                text="Next"
                onPress={onNextHandler}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        padding: 20,
        paddingVertical: 35,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '30%',
        paddingVertical: 10,
    },
});
