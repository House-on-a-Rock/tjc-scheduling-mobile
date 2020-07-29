import React from 'react';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay, compareDates } from '../../services/Calendar/helper_functions';
import { months } from '../../services/Calendar/models';
import { calendarCardDimensions } from '../../shared/constants';
import { Text, Layout, Card } from '@ui-kitten/components';
import { TaskData } from '../../shared/models';

interface Props {
    displayedDate: Date;
    tasks?: TaskData[];
    onDateTilePress?: (date, data) => void;
    reducerType: string;
}

export const Calendar = React.memo(
    (props: Props) => {
        const { tasks, displayedDate } = props;

        console.log('rendering calendar ', displayedDate);

        return (
            <Layout>
                <DayNameRow />
                <DateDisplay
                    firstDay={setFirstDay(displayedDate)}
                    displayedDate={displayedDate}
                    tasks={tasks}
                    onDateTilePress={props.onDateTilePress}
                    reducerType={props.reducerType}
                />
            </Layout>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.displayedDate === nextProps.displayedDate;
    },
);
