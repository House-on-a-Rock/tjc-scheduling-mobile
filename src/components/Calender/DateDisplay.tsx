import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { compareDates } from '../../services/Calendar/helper_functions';
import { DateTile } from './DateTile';

export const DateDisplay = (props) => {
    const month = props.displayedDate.getMonth();
    const year = props.displayedDate.getFullYear();
    const dateArray = new Array(6);
    const { firstDay } = props;
    const initialDate = new Date(year, month, 1);

    function determineRenderDateClosure(initial) {
        let renderDate: Date = new Date(
            initial.setDate(initial.getDate() - firstDay - 1),
        );

        return updateDate;
        function updateDate() {
            const returnDate = renderDate;
            renderDate.setDate(renderDate.getDate() + 1);
            return returnDate;
        }
    }

    const determineDate = determineRenderDateClosure(initialDate);

    const populateTasks = (date: Date): Date[] => {
        const tasks = useSelector(({ profileReducer }) => profileReducer.data.tasks);
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
            const day: Date = determineDate();
            const isToday = compareDates(day, currentDate);
            const data: Object[] = populateTasks(day);
            const isCurrentMonth = day.getMonth() === month;

            dateArray[j][k] = (
                <DateTile
                    data={data}
                    renderedDate={new Date(day)}
                    key={j + j * (k + 1) + k}
                    style={styles.dateTileStyle}
                    textStyle={
                        //TODO move text styling into dateTile after we determine font, etc
                        isCurrentMonth
                            ? styles.currentMonthDatesText
                            : styles.notCurrentMonthDatesText
                    }
                    isToday={isToday}
                    isCurrentMonth={isCurrentMonth}
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
