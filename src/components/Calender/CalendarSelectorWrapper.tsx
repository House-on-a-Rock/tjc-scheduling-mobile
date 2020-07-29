import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Icon, Layout, Text } from '@ui-kitten/components';
import { TaskData } from '../../shared/models/';
import { View } from 'react-native';
import { months } from '../../services/Calendar/models';
import { useStringDate } from '../../services/Hooks/useStringDate';
import { selectSwapDate } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CalendarSelectorWrapperProps {
    displayedDate: Date;
    tasks: TaskData[];
}

export const CalendarSelectorWrapper = ({
    displayedDate,
    tasks,
}: CalendarSelectorWrapperProps) => {
    const [currentDate, setCurrentDate] = useState(displayedDate);
    const [isLeap, year, month] = useStringDate(currentDate);
    const dispatch = useDispatch();

    const onDateTilePress = (date, data) => {
        dispatch(selectSwapDate(date));
    };

    const onArrowPressHandler = (direction) => {
        let newDate = new Date(currentDate);
        if (direction === 'forward') {
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
        } else {
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
        }
    };

    return (
        <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '80%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity onPress={() => onArrowPressHandler('backward')}>
                    <Icon height={50} width={50} name="arrow-left-outline" />
                </TouchableOpacity>

                <Text category="h5">
                    {months(isLeap)[month].name} {year}
                </Text>
                <TouchableOpacity onPress={() => onArrowPressHandler('forward')}>
                    <Icon height={50} width={50} name="arrow-right-outline" />
                </TouchableOpacity>
            </View>
            <Calendar
                displayedDate={currentDate}
                tasks={tasks}
                handleTilePress={onDateTilePress}
                type="swapReducer"
            />
        </Layout>
    );
};
