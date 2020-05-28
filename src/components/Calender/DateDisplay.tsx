import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { months } from '../../services/Calendar/models';
import { compareDates } from '../../services/Calendar/helper_functions';
import { DateTile } from './DateTile';

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

    const determineCurrentDay = (): Date => {
        if (currentlyRendering === renderingMonth.previous) {
            if (startDisplayDate <= previousMonthFinalDate) {
                return new Date(year, month - 1, startDisplayDate++);
            } else {
                currentlyRendering = renderingMonth.current;
            }
        }
        if (currentlyRendering === renderingMonth.current) {
            if (dayCounter <= daysInMonth) {
                return new Date(year, month, dayCounter++);
            } else {
                dayCounter = 1;
                currentlyRendering = renderingMonth.next;
            }
        }
        if (currentlyRendering === renderingMonth.next) {
            return new Date(year, month + 1, dayCounter++);
        }
    };

    const populateTasks = (date: Date): Date[] => {
        const tasks = useSelector(({ profileReducer }) => profileReducer.profile.tasks);
        const filteredTasks = tasks.filter((task) => {
            const tasksDate = new Date(task.date);
            return compareDates(tasksDate, date);
        });

        return filteredTasks;
    };

    const currentDate = useSelector((state) => state.calendarReducer.today);

    for (let j = 0; j < dateArray.length; j++) {
        dateArray[j] = new Array(7);
        for (let k = 0; k < dateArray[j].length; k++) {
            const day: Date = determineCurrentDay();
            const isToday = compareDates(day, currentDate);
            const day1 = day;
            day1.setDate(day.getDate() + 1);
            const data: Object[] = populateTasks(day1); //IT JUST WORKS OK, the comparison is off by one otherwise
            dateArray[j][k] = (
                <DateTile
                    data={data}
                    renderedDate={day}
                    key={j + j * (k + 1) + k}
                    style={styles.dateTileStyle}
                    textStyle={
                        //TODO move text styling into dateTile after we determine font, etc
                        currentlyRendering === renderingMonth.current
                            ? styles.currentMonthDatesText
                            : styles.notCurrentMonthDatesText
                    }
                    isCurrentMonth={currentlyRendering === renderingMonth.current}
                    isToday={isToday}
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
