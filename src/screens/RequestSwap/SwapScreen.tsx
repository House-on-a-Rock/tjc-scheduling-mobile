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
import { populateCandidates, populateTimes } from './swapHelper';

interface SwapScreenProps {
    navigation;
    route;
}

export const SwapScreen = (props: SwapScreenProps) => {
    //TODO: sort candidates alphabetically before here, maybe server side?
    const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);

    const [pinnedIndex, setPinnedIndex] = useState();
    const [selectedPersonIndex, setSelectedPersonIndex] = useState<IndexPath>(
        new IndexPath(0),
    );
    const [selectedTimeIndex, setSelectedTimeIndex] = useState<IndexPath>(
        new IndexPath(0),
    );
    const [selectedDates, setSelectedDates] = useState([]);

    //https://stackoverflow.com/questions/48834275/good-way-to-chain-filter-functions-in-javascript/48834470#48834470
    //thank god for stack overflow
    const filters = [
        (task) =>
            selectedPersonIndex.row !== 0
                ? task.user.firstName ===
                      swapCandidates[selectedPersonIndex.row - 1].firstName &&
                  task.user.lastName ===
                      swapCandidates[selectedPersonIndex.row - 1].lastName
                : true,
        (task) =>
            selectedDates.length > 0
                ? selectedDates.some((date) =>
                      compareDates(new Date(date), new Date(task.date)),
                  )
                : true,
    ];

    const tasks = swapCandidates
        .reduce((acc, currentValue) => [...acc, ...currentValue.tasks], [])
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const filteredData = filters.reduce(
        (accumulator, filterFunc) => accumulator.filter(filterFunc),
        tasks,
    );

    //callbacks
    const onItemSelect = (item, index) => {
        // console.log('item, index', item, index);
        //change border color of item
        //if filter changes, move to top of array
    };

    //tile press callback
    const onTilePress = (date) => {
        const dates = selectedDates.filter((item) => !compareDates(item, date));

        //if after filtering, length is the same, then the date was not selected before so add the new date
        //else the date was prev selected, so set selectedDates to the filtered list
        dates.length === selectedDates.length
            ? setSelectedDates([...selectedDates, date])
            : setSelectedDates(dates);
        //filter displayed Tasks
    };

    //dropdown items for people
    const candidates = populateCandidates(swapCandidates);
    const displayedPerson =
        selectedPersonIndex.row === 0
            ? 'Name'
            : `${swapCandidates[selectedPersonIndex.row - 1].firstName} ${
                  swapCandidates[selectedPersonIndex.row - 1].lastName
              }`;

    //dropdown items for time
    const possibleTimes = ['AM', 'PM']; //temp until database is finished

    const times = populateTimes(possibleTimes);
    const displayedTime =
        selectedTimeIndex.row === 0 ? 'Time' : possibleTimes[selectedTimeIndex.row - 1];

    //flatlist of tasks -- task has {church, date, role, roleId, taskId, user-First/Last names, userId}
    const renderTaskList = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => onItemSelect(item, index)}
            >
                <Text>{item.role.name}</Text>
                <Text>{new Date(item.date).toLocaleDateString('en-US')}</Text>
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
                    initialTasks={tasks}
                />

                <Select
                    selectedIndex={selectedPersonIndex}
                    placeholder="Person"
                    value={displayedPerson}
                    onSelect={(index: IndexPath) => {
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
                    onSelect={(index: IndexPath) => {
                        setSelectedTimeIndex(index);
                    }}
                    style={{ width: '30%' }}
                >
                    {times}
                </Select>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={filteredData}
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
