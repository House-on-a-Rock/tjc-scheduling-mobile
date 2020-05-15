import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DateDisplay } from './DateDisplay';
import { DayNameRow } from './DayNameRow';
import { setFirstDay } from '../../utils/helper_functions';
import { TitleText } from '../../utils/components';
import { months } from '../../utils/models/calendar';

export const CalendarCard = (props) => {
    const { displayedDate } = props;
    const isLeap = displayedDate.getFullYear() % 4 === 0 ? true : false;
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();
    return (
        <View style={{ ...styles.cardContainer, ...props.style }}>
            <View style={styles.insideContainer}>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <TitleText style={styles.yearText}>{year}</TitleText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TitleText style={styles.monthText}>
                            {months(isLeap)[month].name}
                        </TitleText>
                    </TouchableOpacity>
                </View>
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
    container: {
        width: '100%',
        height: '20%',
        // borderColor: "black",
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearText: {
        alignSelf: 'center',
        fontSize: 40,
        color: '#3E48DA',
        letterSpacing: 1,
        // shadowColor: 'black',
        // shadowOffset: {
        // 	width: 10,
        // 	height: 5,
        // },
        // shadowOpacity: 0.3,
    },
    monthText: {
        alignSelf: 'center',
        fontSize: 30,
    },
});
