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
    IndexPath,
} from '@ui-kitten/components';
import { CalendarSelectorWrapper } from '../../components/Calender/CalendarSelectorWrapper';
import { ModalHeader } from '../../components/';
import { useDispatch } from 'react-redux';
import { selectTargetTask } from '../../store/actions/swapActions';

interface SwapScreenProps {
    navigation;
    route;
}

export const SwapScreen = (props: SwapScreenProps) => {
    //props.route.params.selectedOption stores what was selected on previous screen
    //jk its in reducer too now
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate.date);
    const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);
    const [checked, setChecked] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

    //this is the date they chose to swap on
    const selectedSwapDate = useSelector((state) => state.swapReducer.date);
    const dispatch = useDispatch();

    //true if radio is checked or (if an index and a date are both selected)
    let nextButtonClickable =
        checked || (selectedIndex !== null && selectedSwapDate !== null);

    const onNextHandler = () => {
        if (checked) {
            dispatch(selectTargetTask(undefined));
        } else {
            dispatch(selectTargetTask(displayValue.tasks[0]));
        }
        props.navigation.navigate('SwapSummary');
    };

    const candidates = swapCandidates.map((candidate, index) => {
        return (
            <SelectItem
                key={`${index}-candidate.email`}
                title={`${candidate.firstName} ${candidate.lastName}`}
            />
        );
    });

    const displayValue = swapCandidates[selectedIndex.row];

    return (
        <Layout style={styles.layout}>
            <ModalHeader
                goBack={props.navigation.goBack}
                closeModal={props.route.params.closeModal}
            />
            <Radio
                style={{ padding: 20 }}
                checked={checked}
                onChange={(nextChecked) => {
                    setChecked(nextChecked);
                }}
            >
                {(evaProps) => <Text category="h6"> Switch with anyone / any time</Text>}
            </Radio>
            <Text style={{ padding: 10 }}>-------- OR --------</Text>
            <Layout
                style={
                    checked
                        ? { ...styles.selectionContainer, ...styles.disabledView }
                        : styles.selectionContainer
                }
                pointerEvents={checked ? 'none' : 'auto'}
            >
                <Layout style={styles.selectionDropdown} level="1">
                    <Select
                        selectedIndex={selectedIndex}
                        placeholder="place holder"
                        value={`${displayValue?.firstName} ${displayValue?.lastName}`}
                        onSelect={(index) => {
                            setSelectedIndex(index);
                        }}
                    >
                        {candidates}
                    </Select>
                </Layout>
                <View style={{ width: '100%', flex: 1 }}>
                    <CalendarSelectorWrapper displayedDate={selectedDate} tasks={[]} />
                </View>
            </Layout>
            <View
                style={nextButtonClickable ? { opacity: 1 } : styles.disabledView}
                pointerEvents={nextButtonClickable ? 'auto' : 'none'}
            >
                {!nextButtonClickable && (
                    <Text status="warning">Please select an option</Text>
                )}
                <Button onPress={onNextHandler}>Next</Button>
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
    selectionContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    disabledView: {
        opacity: 0.4,
    },
    selectionDropdown: {
        width: '80%',
        minHeight: 64,
        padding: 10,
    },
});
