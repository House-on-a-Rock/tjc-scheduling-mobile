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
    Datepicker,
    Icon,
    NativeDateService,
} from '@ui-kitten/components';
import { CalendarSelectorWrapper } from '../../components/Calender/CalendarSelectorWrapper';
import { ModalHeader } from '../../components/';
import { useDispatch } from 'react-redux';
import { selectTargetTask } from '../../store/actions/swapActions';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { compareDates } from '../../services/Calendar/helper_functions';

interface SwapScreenProps {
    navigation;
    route;
}

export const SwapScreen = (props: SwapScreenProps) => {
    const swapCandidates = useSelector((state) => state.swapReducer.candidates || []);
    const [date, setDate] = useState(new Date());
    const [searchParams, setSearchParams] = useState({});
    const [pinnedIndex, setPinnedIndex] = useState();
    const [selectedPersonIndex, setSelectedPersonIndex] = useState(new IndexPath(0));
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(new IndexPath(0));

    //creates sorted array of tasks from candidates array
    const initialTasks = swapCandidates.reduce(
        (acc, currentValue) => [...acc, ...currentValue.tasks],
        [],
    );
    initialTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const [displayedTasks, setDisplayedTasks] = useState(initialTasks);

    //props for datepicker
    const dateService = new NativeDateService('en', { format: 'MM/DD/YYYY' });

    //callbacks
    const onItemSelect = (item, index) => {
        console.log('item, index', item, index);
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
    const displayedPerson = swapCandidates[selectedPersonIndex.row];

    //dropdown items for time
    const possibleTimes = ['AM', 'PM'];
    const times = possibleTimes.map((item, index) => (
        <SelectItem key={index} title={item} />
    ));
    const displayedTime = possibleTimes[selectedTimeIndex.row];
    //renders day for datepicker calendar
    const renderDay = (date, namedStyles) => {
        //if date appears in tasks array, then render dot indicator

        const dateCompare = (item) =>
            compareDates(new Date(item.date), new Date(date.date));
        //https://medium.com/@d7k/js-includes-vs-some-b3cd546a7bc3 array.some() vs array.includes()
        const shouldRender = initialTasks.some(dateCompare);

        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...namedStyles.container,
                }}
            >
                <Text style={{ ...namedStyles.text }}>{date.date.getDate()}</Text>
                {shouldRender && <Entypo name="dot-single" size={20} color="black" />}
            </View>
        );
    };

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
                <Datepicker
                    style={{ padding: 10 }}
                    date={date}
                    onSelect={(nextDate) => setDate(nextDate)}
                    // accessoryRight={CalendarIcon}
                    size="small"
                    autoDismiss={false}
                    dateService={dateService}
                    renderDay={(date, namedStyles) => renderDay(date, namedStyles)}
                />

                <Select
                    selectedIndex={selectedPersonIndex}
                    placeholder="Name"
                    value={`${displayedPerson?.firstName} ${displayedPerson?.lastName}`}
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        width: '100%',
    },
    listItem: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
    },
});
