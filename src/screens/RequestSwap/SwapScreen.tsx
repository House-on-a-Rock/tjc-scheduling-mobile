import React, { useState } from 'react';
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
// import { Picker } from '@react-native-community/picker';

export const SwapScreen = (props) => {
    //props.route.params.selectedOption stores what was selected on previous screen

    const [checked, setChecked] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | number>('option 1');
    const [selectedIndex, setSelectedIndex] = useState<string | number>(0);

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
                {/* <Select
                    selectedIndex={selectedIndex}
                    onSelect={(index) => setSelectedIndex(index)}
                >
                    <SelectItem style={{ zIndex: 15 }} title="option 1" />
                    <SelectItem style={{ zIndex: 15 }} title="option 2" />
                    <SelectItem style={{ zIndex: 15 }} title="option 3" />
                </Select> */}
                <Picker
                    mode="dropdown"
                    selectedValue={selected}
                    onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                >
                    <Picker.Item label="option 1" value="option1" />
                    <Picker.Item label="option 2" value="option2" />
                    <Picker.Item label="option 3" value="option3" />
                    <Picker.Item label="option 4" value="option4" />
                </Picker>
            </Layout>
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
