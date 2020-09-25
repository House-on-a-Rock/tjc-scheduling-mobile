import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import {
    Layout,
    Text,
    Button,
    Radio,
    Select,
    SelectItem,
    IndexPath,
    Icon,
    NativeDateService,
    Datepicker,
} from '@ui-kitten/components';
import { CalendarSelectorWrapper } from '../../components/Calender/CalendarSelectorWrapper';
import { ModalHeader } from '../../components/';
import { useDispatch } from 'react-redux';
import { selectTargetTask } from '../../store/actions/swapActions';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { compareDates } from '../../services/Calendar/helper_functions';
import { DatePicker } from '../../components/New Calendar/DatePicker';

interface SwapScreenProps {
    navigation;
    route;
}

export const SwapScreen = (props: SwapScreenProps) => {
    const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);
    const [date, setDate] = useState(new Date());
    const [searchParams, setSearchParams] = useState({});
    const [pinnedIndex, setPinnedIndex] = useState();
    const [selectedPersonIndex, setSelectedPersonIndex] = useState();
    const [selectedTimeIndex, setSelectedTimeIndex] = useState();
    const [selectedDates, setSelectedDates] = useState([]);

    //tile press callback
    const onTilePress = (date) => {
        const dates = selectedDates.filter((item) => !compareDates(item, date));

        //if after filtering, length is the same, then the date was not selected before so add the new date
        //else the date was prev selected, so set selectedDates to the filtered list
        dates.length === selectedDates.length
            ? setSelectedDates([...selectedDates, date])
            : setSelectedDates(dates);
    };

    //creates sorted array of tasks from candidates array
    const initialTasks = swapCandidates.reduce(
        (acc, currentValue) => [...acc, ...currentValue.tasks],
        [],
    );
    //tasks sorted by date
    initialTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const [displayedTasks, setDisplayedTasks] = useState(initialTasks);

    //callbacks
    const onItemSelect = (item, index) => {
        // console.log('item, index', item, index);
        //change border color of item
        //if filter changes, move to top of array
    };

    //dropdown items for people

    const candidates = swapCandidates.map((candidate, index) => {
        return (
            <SelectItem
                key={`${index}-${candidate.email}`}
                title={`${candidate.firstName} ${candidate.lastName}`}
            />
        );
    });
    // const displayedPerson = swapCandidates[selectedPersonIndex?.row] || 'Person';
    console.log('candidates', candidates);
    console.log('swapCandidates', swapCandidates);
    const displayedPerson = candidates[selectedPersonIndex?.row]?.title || 'Person';

    //dropdown items for time
    const possibleTimes = ['AM', 'PM'];
    const times = possibleTimes.map((item, index) => (
        <SelectItem key={index} title={item} />
    ));
    const displayedTime = possibleTimes[selectedTimeIndex?.row];

    //flatlist of tasks -- task has {church, date, role, roleId, taskId, user-First/Last names, userId}
    const renderTaskList = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => onItemSelect(item, index)}
            >
                <Text>{item.role.name}</Text>
                <Text>{item.date}</Text>
                <Text>
                    {item.user.firstName} {item.user.lastName}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Layout style={styles.layout}>
            <View style={styles.filterContainer}>
                <DatePicker
                    selectedDates={selectedDates}
                    onTilePress={onTilePress}
                    initialTasks={initialTasks}
                />

                <Select
                    selectedIndex={selectedPersonIndex}
                    placeholder="Person"
                    // value={`${displayedPerson?.firstName} ${displayedPerson?.lastName}`}
                    value={displayedPerson}
                    onSelect={(index) => {
                        setSelectedPersonIndex(index);
                    }}
                    style={{ width: '40%', padding: 2 }}
                >
                    {candidates}
                </Select>
                <Select
                    selectedIndex={selectedTimeIndex}
                    placeholder="Time"
                    value={displayedTime}
                    onSelect={(index) => {
                        setSelectedTimeIndex(index);
                    }}
                    style={{ width: '30%' }}
                >
                    {times}
                </Select>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={displayedTasks}
                    renderItem={renderTaskList}
                    keyExtractor={(item) => `${item.date} ${item.id} ${item.taskId}`}
                />
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
    filterContainer: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        zIndex: -1,
    },
    listItem: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
    },
});
