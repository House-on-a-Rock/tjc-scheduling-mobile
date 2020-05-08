import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MonthYearTitle } from './MonthYearTitle';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay } from '../../utils';

export const CalendarCard = (props) => {
    const { displayedDate } = props;
    return (
        <View style={{ ...styles.cardContainer, ...props.style }}>
            <View style={styles.insideContainer}>
                <MonthYearTitle
                    month={displayedDate.getMonth()}
                    year={displayedDate.getFullYear()}
                />
                <View>
                    <DayNameRow />
                    <DateDisplay
                        firstDay={setFirstDay(displayedDate)}
                        month={displayedDate.getMonth()}
                        year={displayedDate.getFullYear()}
                        today={displayedDate.getDate()}
                        onPress={props.onPress}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
    },
    insideContainer: {
        margin: 10,
    },
});
