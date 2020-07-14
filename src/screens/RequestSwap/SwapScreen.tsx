import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import {
    Layout,
    Text,
    Icon,
    Button,
    Radio,
    Select,
    SelectItem,
    IndexPath,
} from '@ui-kitten/components';
import { CalendarCard } from '../../components/Calender/CalendarCard';

export const SwapScreen = (props) => {
    //props.route.params.selectedOption stores what was selected on previous screen
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate.date);
    const [checked, setChecked] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    //don't think this is needed anywhere else, will extract if needed
    const ModalHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={props.navigation.goBack}
                >
                    <Icon style={{ width: 33, height: 55 }} name="arrow-ios-back" />
                    <Text category="h4">Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.route.params.closeModal}>
                    <Icon style={{ width: 50, height: 50 }} name="close-square" />
                </TouchableOpacity>
            </View>
        );
    };

    console.log('selectedDate', selectedDate);

    return (
        <Layout style={styles.layout}>
            <ModalHeader />
            <Radio
                style={{ padding: 20, zIndex: 3 }}
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
            >
                {(evaProps) => <Text category="h6"> Switch with anyone / any time</Text>}
            </Radio>
            <Text style={{ padding: 10 }}>-------- OR --------</Text>
            <Layout style={{ width: '80%', minHeight: 128, padding: 10 }} level="1">
                <Select
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                >
                    <SelectItem style={{ zIndex: 15 }} title="option 1" />
                    <SelectItem style={{ zIndex: 15 }} title="option 2" />
                    <SelectItem style={{ zIndex: 15 }} title="option 3" />
                </Select>
            </Layout>
            <CalendarCard displayedDate={selectedDate} tasks={[]} />
        </Layout>
    );
};
const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        zIndex: 15,
    },
});
