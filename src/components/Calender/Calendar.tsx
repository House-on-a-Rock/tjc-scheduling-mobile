import React from 'react';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay } from '../../services/Calendar/helper_functions';

import { Layout } from '@ui-kitten/components';
import { TaskData } from '../../shared/models';

interface CalendarProps {
    displayedDate: Date;
    tasks?: TaskData[];
    handleTilePress?: (date, data) => void;
    type: string;
}

export const Calendar = ({
    tasks,
    displayedDate,
    handleTilePress,
    type,
}: CalendarProps) => {
    return (
        <Layout>
            <DayNameRow />
            <DateDisplay
                firstDay={setFirstDay(displayedDate)}
                displayedDate={displayedDate}
                tasks={tasks}
                handleTilePress={handleTilePress}
                type={type}
            />
        </Layout>
    );
};
