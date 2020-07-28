import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import {
    Layout,
    Text,
    Button,
    Radio,
    Select,
    SelectItem,
    IndexPath, //will be used eventually?
} from '@ui-kitten/components';
import { CalendarSwiper } from '../../components/Calender/CalendarSwiper';
import { ModalHeader } from '../../components/';

interface SwapScreenProps {
    navigation;
    route;
}

export const SwapScreen = (props: SwapScreenProps) => {
    //props.route.params.selectedOption stores what was selected on previous screen
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate.date);
    const [checked, setChecked] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(0);

    return (
        <Layout style={styles.layout}>
            <ModalHeader
                goBack={props.navigation.goBack}
                closeModal={props.route.params.closeModal}
            />
            <Radio
                style={{ padding: 20, zIndex: 3 }}
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
            >
                {(evaProps) => <Text category="h6"> Switch with anyone / any time</Text>}
            </Radio>
            <Text style={{ padding: 10 }}>-------- OR --------</Text>
            <Layout
                style={{
                    width: '80%',
                    minHeight: 64,
                    padding: 10,
                }}
                level="1"
            >
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                >
                    <SelectItem style={{ zIndex: 15 }} title="option 1" />
                    <SelectItem style={{ zIndex: 15 }} title="option 2" />
                    <SelectItem style={{ zIndex: 15 }} title="option 3" />
                </Select>
            </Layout>
            <View style={{ width: '100%', flex: 1 }}>
                <CalendarSwiper displayedDate={selectedDate} tasks={[]} />
            </View>
            <View style={{ padding: 5 }}>
                <Button onPress={() => props.navigation.navigate('SwapSummary')}>
                    Next
                </Button>
            </View>
        </Layout>
    );
};
const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
});
