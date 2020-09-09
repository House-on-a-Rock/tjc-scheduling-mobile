import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Carousel } from '../../components/Calender';
import { TaskPreviewPane } from '../../components/TaskPreviewPane/TaskPreviewPane';
import { Screen } from '../../components/Screen';
import { openDrawerAction } from '../../shared/components';
import { Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useCheckPermissions } from '../../services/Hooks/useCheckPermissions';

interface ScheduleScreenProps {
    route;
    navigation;
}

export const ScheduleScreen = (props: ScheduleScreenProps) => {
    // const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    // const rightAccessory = () => (
    //     <TouchableOpacity onPress={() => props.navigation.navigate('TaskList')}>
    //         <Text>View as List</Text>
    //     </TouchableOpacity>
    // );

    const isPreviewPaneOpen = useSelector(
        (state) => state.calendarReducer.previewPaneVisible,
    );

    useEffect(() => {
        //checks for notification permission, requests expo token, and updates db with updated expo token
        useCheckPermissions();
    }, []);

    return (
        // <Screen
        //     title={() => (
        //         <Text category="h3" status="basic">
        //             My Duties
        //         </Text>
        //     )}
        //     accessoryLeft={leftAccessory}
        //     accessoryRight={rightAccessory}
        // >
        <Layout style={styles.scrollContainer}>
            <Carousel />
            {isPreviewPaneOpen && <TaskPreviewPane />}
        </Layout>
        // </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
});
