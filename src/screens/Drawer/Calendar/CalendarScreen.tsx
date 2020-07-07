import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarScreenProps } from '../../../shared/models';
import { Carousel } from '../../../components/Calender';
import { TaskPreviewPane } from '../../../components/TaskPreviewPane';
import { Screen } from '../../../components/Screen';
import { openDrawerAction } from '../../../shared/components';
import { Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const CalendarScreen = (props: CalendarScreenProps) => {
    const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    const rightAccessory = () => (
        <TouchableOpacity onPress={() => props.navigation.navigate('Tasks')}>
            <Text>View as List</Text>
        </TouchableOpacity>
    );

    return (
        <Screen
            title={() => (
                <Text category="h3" status="basic">
                    My Duties
                </Text>
            )}
            accessoryLeft={leftAccessory}
            accessoryRight={rightAccessory}
        >
            <Layout style={styles.scrollContainer}>
                <Carousel />
            </Layout>
            <TaskPreviewPane />
        </Screen>
    );
};

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
