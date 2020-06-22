import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay } from '../../services/Calendar/helper_functions';
import { months } from '../../services/Calendar/models';
import { TitleText } from '../../shared/components';
import { Card, Text } from '@ui-kitten/components';

interface Props {
    displayedDate: Date;
}

export const CalendarCard = (props: Props) => {
    const { displayedDate } = props;
    const isLeap = displayedDate.getFullYear() % 4 === 0 ? true : false;
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();

    return (
        <Card
            style={{
                width: '100%',
                height: 400, // TODO extract these constants
                justifyContent: 'center',
            }}
            header={() => (
                <Text category="h3" status="basic " style={{ paddingHorizontal: 30 }}>
                    {months(isLeap)[month].name}
                </Text>
            )}
            appearance="filled"
        >
            <View>
                {/* <View style={styles.container}>
                    <TouchableOpacity>
                        <TitleText style={styles.monthText}>
                            {months(isLeap)[month].name} {year}
                        </TitleText>
                    </TouchableOpacity>
                </View> */}
                <View>
                    <DayNameRow />
                    <DateDisplay
                        firstDay={setFirstDay(displayedDate)}
                        displayedDate={displayedDate}
                    />
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearText: {
        alignSelf: 'center',
        fontSize: 40,
        color: '#3E48DA',
        letterSpacing: 1,
    },
    monthText: {
        alignSelf: 'center',
        fontSize: 30,
        color: '#3E48DA',
    },
});
