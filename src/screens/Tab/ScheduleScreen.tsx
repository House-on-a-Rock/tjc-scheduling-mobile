import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Carousel } from '../../components/Calender';
import { TaskPreviewPane } from '../../components/TaskPreviewPane/TaskPreviewPane';
import { Screen } from '../../components/Screen';
import { openDrawerAction } from '../../shared/components';
import { Datepicker, Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useCheckPermissions } from '../../services/Hooks/useCheckPermissions';
import { ScrollCalendar } from '../../components/New Calendar/ScrollCalendar';
import { DatePicker } from '../../components/New Calendar/DatePicker';
import { compareDates } from '../../services/Calendar/helper_functions';

interface ScheduleScreenProps {
    route;
    navigation;
}

export const ScheduleScreen = (props: ScheduleScreenProps) => {
    // const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    // const rightAccessory = () => (
    //     <TouchableOpacity onPress={() => props.navigation.navigate('TaskList')}>
    //         <Text>View as List</Text>
    //     </TouchableOpacity>
    // );

    const isPreviewPaneOpen = useSelector(
        (state) => state.calendarReducer.previewPaneVisible,
    );

    useEffect(() => {
        //checks for notification permission, requests expo token, and updates db with updated expo token
        useCheckPermissions();
    }, []);

    const [selectedDates, setSelectedDates] = useState([]);

    const onTilePress = (date) => {
        const dates = selectedDates.filter((item) => !compareDates(item, date));
        //if after filtering, length is the same, then the date was not selected before so add the new date
        //else the date was prev selected, so set selectedDates to the filtered list
        dates.length === selectedDates.length
            ? setSelectedDates([...selectedDates, date])
            : setSelectedDates(dates);
    };

    return (
        // <Screen
        //     title={() => (
        //         <Text category="h3" status="basic">
        //             My Duties
        //         </Text>
        //     )}
        //     accessoryLeft={leftAccessory}
        //     accessoryRight={rightAccessory}
        // >
        <Layout style={styles.scrollContainer}>
            <Carousel />

            {/* <DatePicker selectedDates={selectedDates} onTilePress={onTilePress} /> */}
            {isPreviewPaneOpen && <TaskPreviewPane />}
        </Layout>
        // </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
});
