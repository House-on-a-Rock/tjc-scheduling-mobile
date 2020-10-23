import React from 'react';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';

import { Layout } from '@ui-kitten/components';
import { TaskData } from '../../shared/models';

interface CalendarProps {
    displayedDate: Date;
    tasks?: TaskData[];
    handleTilePress?: (date, data, cardIndex?) => void;
    type: string;
    cardIndex: number;
}

export const Calendar = ({
    tasks,
    displayedDate,
    handleTilePress,
    type,
    cardIndex,
}: CalendarProps) => {
    return (
        <Layout>
            <DayNameRow />
            <DateDisplay
                firstDay={displayedDate.getDay()}
                displayedDate={displayedDate}
                tasks={tasks}
                handleTilePress={handleTilePress}
                type={type}
                cardIndex={cardIndex}
            />
        </Layout>
    );
};
