import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay } from '../../services/Calendar/helper_functions';
import { months } from '../../services/Calendar/models';
import { calendarCardDimensions } from '../../shared/constants';
import { Text, Layout, Card } from '@ui-kitten/components';

interface Props {
    displayedDate: Date;
}

export const CalendarCard = React.memo((props: Props) => {
    const { displayedDate } = props;
    const isLeap = displayedDate.getFullYear() % 4 === 0 ? true : false;
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();

    return (
        <Card
            header={() => (
                <Text style={{ paddingLeft: 20 }} category="h5">
                    {months(isLeap)[month].name} {year}
                </Text>
            )}
            appearance="filled"
            style={{
                width: '100%',
                height: calendarCardDimensions.height,
                marginBottom: calendarCardDimensions.margin,
            }}
        >
            <Layout>
                <View>
                    <DayNameRow />
                    <DateDisplay
                        firstDay={setFirstDay(displayedDate)}
                        displayedDate={displayedDate}
                    />
                </View>
            </Layout>
        </Card>
    );
});
