import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateTile } from './DateTile';
import { months } from '../../utils/models/calendar';
import { compareDates } from './utils/calendarServices';
import { useSelector } from 'react-redux';

const renderingMonth = {
    previous: 'previous',
    current: 'current',
    next: 'next',
};

export const DateDisplay = (props) => {
    const month = props.displayedDate.getMonth();
    const year = props.displayedDate.getFullYear();
    const dateArray = new Array(6);
    const isLeap = year % 4 === 0 ? true : false;
    const daysInMonth = months(isLeap)[month].days;
    const previousMonth = month - 1 >= 0 ? month - 1 : 11;

    let startDisplayDate =
        props.firstDay !== 0
            ? months(isLeap)[previousMonth].days - props.firstDay + 1
            : 1;
    let previousMonthFinalDate = months(isLeap)[previousMonth].days;
    let currentlyRendering =
        props.firstDay !== 0 ? renderingMonth.previous : renderingMonth.current;
    let dayCounter = 1;

    const determineDate = () => {
        if (currentlyRendering === renderingMonth.previous) {
            if (startDisplayDate <= previousMonthFinalDate) {
                return startDisplayDate++;
            } else {
                currentlyRendering = renderingMonth.current;
            }
        }
        if (currentlyRendering === renderingMonth.current) {
            if (dayCounter <= daysInMonth) {
                return dayCounter++;
            } else {
                dayCounter = 1;
                currentlyRendering = renderingMonth.next;
            }
        }
        if (currentlyRendering === renderingMonth.next) {
            return dayCounter++;
        }
    };

    const populateTasks = (date) => {
        const tasks = useSelector((state) => state.profileReducer.profile.tasks);
        const filteredTasks = tasks.filter((task) => {
            const tasksDate = new Date(task.date);
            return compareDates(tasksDate, date);
        });
        return filteredTasks;
    };

    for (let j = 0; j < dateArray.length; j++) {
        dateArray[j] = new Array(7); //creates 2d array, 6 rows of 7
        for (let k = 0; k < dateArray[j].length; k++) {
            const dateConstruct = new Date(year, month, determineDate());
            let data = populateTasks(dateConstruct);
            dateArray[j][k] = (
                <DateTile
                    data={data}
                    renderedDate={dateConstruct}
                    key={j + j * (k + 1) + k}
                    style={styles.dateTileStyle}
                    textStyle={
                        currentlyRendering === renderingMonth.current
                            ? styles.currentMonthDatesText
                            : styles.notCurrentMonthDatesText
                    }
                />
            );
        }
    }
    return <View style={styles.datesContainer}>{dateArray}</View>;
};

const styles = StyleSheet.create({
    datesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    dateTileStyle: {
        width: '14.2857%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentMonthDatesText: {
        color: '#1A7ECB',
    },
    notCurrentMonthDatesText: {
        color: '#C98B8F',
    },
});
