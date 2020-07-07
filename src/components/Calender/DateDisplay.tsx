import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { compareDates } from '../../services/Calendar/helper_functions';
import { DateTile } from './DateTile';
import { selectDate } from '../../store/actions';
import { TaskData } from '../../shared/models';

interface DateDisplayProps {
    firstDay: number;
    displayedDate: Date;
    tasks: TaskData[];
}

export const DateDisplay = React.memo((props: DateDisplayProps) => {
    const dispatch = useDispatch();
    const month = props.displayedDate.getMonth();
    const year = props.displayedDate.getFullYear();
    const dateArray = new Array(6);
    const { firstDay, tasks } = props;
    const initialDate = new Date(year, month, 1);
    const currentDate = useSelector((state) => state.calendarReducer.today);
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate?.date);

    function determineRenderDate(initial): () => Date {
        let renderDate: Date = new Date(initial.setDate(initial.getDate() - firstDay));

        return updateDate;

        function updateDate() {
            const returnDate: Date = new Date(renderDate);
            renderDate.setDate(renderDate.getDate() + 1);
            return returnDate;
        }
    }

    const determineDate: () => Date = determineRenderDate(initialDate);

    const populateTasks = (date: Date): TaskData[] => {
        const filteredTasks = tasks.filter((task: TaskData) => {
            const tasksDate: Date = new Date(task.date.replace(/-/g, '/'));
            return compareDates(tasksDate, date);
        });

        return filteredTasks;
    };

    // console.log('date display rerendering', month, year);

    const onDateTilePressed = (date: Date, dateTasks: Object[]) => {
        dispatch(selectDate(date, dateTasks));
    };

    for (let j = 0; j < dateArray.length; j++) {
        dateArray[j] = new Array(7);
        for (let k = 0; k < dateArray[j].length; k++) {
            const day: Date = React.useMemo(() => determineDate(), [determineDate]);
            const data: TaskData[] = React.useMemo(() => populateTasks(day), []);
            const isToday: boolean = compareDates(day, currentDate);
            const isCurrentMonth: boolean = day.getMonth() === month;
            let isSelected = false;
            if (compareDates(day, selectedDate)) {
                isSelected = true;
            }

            dateArray[j][k] = (
                <DateTile
                    data={data}
                    day={day}
                    key={`${day.toDateString}${j}${k}`}
                    isToday={isToday}
                    isCurrentMonth={isCurrentMonth}
                    isSelected={isSelected}
                    onPressHandler={onDateTilePressed}
                />
            );
        }
    }

    return <View style={styles.datesContainer}>{dateArray}</View>;
});

const styles = StyleSheet.create({
    datesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
});
