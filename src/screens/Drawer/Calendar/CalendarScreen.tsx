import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { CalendarScreenProps } from '../../../shared/models';
import { Carousel } from '../../../components/Calender';
import { TaskPreview } from '../../../components/TaskPreview';
import { Screen } from '../../../components/Screen';
import { openDrawerAction } from '../../../shared/components';
import { Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';
// import { calendarReducer } from 'src/store/reducers';

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
    return (
        <Screen
            title={() => (
                <Text category="h3" status="basic">
                    Calendar
                </Text>
            )}
            accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        >
            <Layout style={styles.scrollContainer}>
                <Carousel />
            </Layout>
            <TaskPreview />
        </Screen>
    );
};
