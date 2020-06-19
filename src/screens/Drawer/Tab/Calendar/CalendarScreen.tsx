import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps } from '../../../../shared/models';
import { Carousel, TaskPreview } from '../../../../components/Calender';
import { Screen } from '../../../../components/Screen';
import { openDrawerAction } from '../../../../shared/components';

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
});

export const CalendarScreen = (props: CalendarScreenProps) => {
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const calCardDatesArray: Date[] = useSelector(
        ({ calendarReducer }) => calendarReducer.dateArray,
    );

    //TODO extract to another location, use in other stack navs

    return (
        <Screen
            title="Calendar"
            accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        >
            <View style={styles.scrollContainer}>
                <Carousel data={calCardDatesArray} />
            </View>

            {showPreview ? (
                <View>
                    <TaskPreview />
                </View>
            ) : (
                <View></View>
            )}
        </Screen>
    );
};
