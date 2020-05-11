import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { months } from '../../models';
import { TitleText } from '../../utils';

export const MonthYearTitle = (props) => {
    const isLeap = props.year % 4 === 0 ? true : false;
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <TitleText style={styles.yearText}>{props.year}</TitleText>
            </TouchableOpacity>
            <TouchableOpacity>
                <TitleText style={styles.monthText}>
                    {months(isLeap)[props.month].name}
                </TitleText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
