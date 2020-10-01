import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import { Layout, Text, Select, IndexPath, Icon, Button } from '@ui-kitten/components';
import { CalendarSelectorWrapper } from '../../components/Calender/CalendarSelectorWrapper';
import { ModalHeader } from '../../components/';
import { useDispatch } from 'react-redux';
import { selectTargetTask } from '../../store/actions/swapActions';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { compareDates } from '../../services/Calendar/helper_functions';
import { DatePicker } from '../../components/New Calendar/DatePicker';
import { populateCandidates, populateTimes } from './swapHelper';

export const SwapScreen = (props) => {
    //TODO: sort candidates alphabetically before here, maybe server side?
    const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);
    const [selectedPeopleIndices, setSelectedPeopleIndices] = useState<IndexPath[]>([]);
    const [selectedTimeIndices, setSelectedTimeIndices] = useState<IndexPath[]>([]);
    const [selectedDates, setSelectedDates] = useState([]);

    //https://stackoverflow.com/questions/48834275/good-way-to-chain-filter-functions-in-javascript/48834470#48834470
    //thank god for stack overflow
    const filters = [
        (task) =>
            selectedPeopleIndices.length === 0
                ? true
                : selectedPeopleIndices.some(
                      (item) =>
                          swapCandidates[item.row].firstName === task.user.firstName &&
                          swapCandidates[item.row].lastName === task.user.lastName,
                  ),
        (task) =>
            selectedDates.length > 0
                ? selectedDates.some((date) =>
                      compareDates(new Date(date), new Date(task.date)),
                  )
                : true,
        (task) => !task.isSelected,
    ];

    const tasks = React.useMemo(() => {
        return swapCandidates
            .reduce((acc, currentValue) => [...acc, ...currentValue.tasks], [])
            .map((task) => {
                return { ...task, isSelected: false };
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); //may not need if swapCandidates are pre-sorted
    }, [swapCandidates]);

    const [filteredTasks, setFilteredTasks] = useState(tasks);

    //callbacks
    const onItemSelect = (item, index) => {
        setFilteredTasks((f) => {
            let tempFilteredTasks = [...f];
            tempFilteredTasks[index].isSelected = !tempFilteredTasks[index].isSelected;
            return tempFilteredTasks;
        });
    };
    const onTilePress = (date) => {
        const dates = selectedDates.filter((item) => !compareDates(item, date));
        dates.length === selectedDates.length
            ? setSelectedDates([...selectedDates, date])
            : setSelectedDates(dates);
    };

    //dropdown items for people select
    const candidates = populateCandidates(swapCandidates);
    const displayedPerson =
        selectedPeopleIndices.length === 0
            ? 'Name'
            : selectedPeopleIndices.length === 1
            ? `${swapCandidates[selectedPeopleIndices[0].row].firstName} ${
                  swapCandidates[selectedPeopleIndices[0].row].lastName
              }`
            : `${swapCandidates[selectedPeopleIndices[0].row].firstName} ${
                  swapCandidates[selectedPeopleIndices[0].row].lastName
              }...`;

    //dropdown items for time select
    const possibleTimes = ['AM', 'PM']; //temp until database is finished
    const times = populateTimes(possibleTimes);
    const displayedTime =
        selectedTimeIndices.length === 0
            ? 'Time'
            : selectedTimeIndices.length === 1
            ? possibleTimes[selectedTimeIndices[0].row]
            : `${possibleTimes[selectedTimeIndices[0].row]}...`;

    const iconProps = {
        height: 30,
        width: 30,
        fill: '#000000',
    };
    //flatlist render
    const renderTaskList = ({ item, index }) => {
        const taskStyle = item.isSelected
            ? { ...styles.listItem, ...styles.selectedItem }
            : styles.listItem;
        return (
            <TouchableOpacity
                style={taskStyle}
                onPress={() => onItemSelect(item, index)}
                activeOpacity={1}
            >
                <Icon name="person-outline" {...iconProps} />
                <Text>
                    {item.user.firstName} {item.user.lastName}
                </Text>
                <View style={{ flexDirection: 'column' }}>
                    <Text>{item.role.name}</Text>
                    <Text>{new Date(item.date).toLocaleDateString('en-US')}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    function filterTasks() {
        const filtered = filters.reduce(
            (accumulator, filterFunc) => accumulator.filter(filterFunc),
            tasks,
        );
        const selected = tasks.filter((task) => task.isSelected);
        return [...selected, ...filtered];
    }

    const onBlurHandler = () => {
        setFilteredTasks(() => filterTasks());
    };

    const onNextHandler = () => {
        props.navigation.navigate('SwapSummary');
    };

    return (
        <Layout style={styles.layout}>
            <View style={styles.textContainer}>
                <Text>Select one or more workers to request</Text>
                <Text>an exchange of duty times</Text>
            </View>
            <View style={styles.filterContainer}>
                <DatePicker
                    selectedDates={selectedDates}
                    onTilePress={onTilePress}
                    initialTasks={tasks}
                    onBlur={onBlurHandler}
                />

                <Select
                    selectedIndex={selectedPeopleIndices}
                    placeholder="Person"
                    value={displayedPerson}
                    onSelect={(index: IndexPath[]) => {
                        setSelectedPeopleIndices(index);
                    }}
                    onBlur={onBlurHandler}
                    multiSelect={true}
                    style={{ width: '40%', padding: 2 }}
                >
                    {candidates}
                </Select>

                <Select
                    selectedIndex={selectedTimeIndices}
                    placeholder="Time"
                    value={displayedTime}
                    onSelect={(index: IndexPath[]) => {
                        setSelectedTimeIndices(index);
                    }}
                    style={{ width: '28%' }}
                    multiSelect={true}
                >
                    {times}
                </Select>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={filteredTasks}
                    renderItem={renderTaskList}
                    keyExtractor={(item) => `${item.date} ${item.id} ${item.taskId}`}
                    showsVerticalScrollIndicator={false}
                />
                <Button style={{ margin: 10, width: 130 }} onPress={onNextHandler}>
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
    filterContainer: {
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        zIndex: -1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(108, 207, 212)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30,
    },
    textContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: 330,
        height: 70,
        margin: 5,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    selectedItem: {
        borderColor: 'rgb(127, 15, 239)',
        borderWidth: 2,
        backgroundColor: 'white',
        margin: 5,
        padding: 4,
    },
});
