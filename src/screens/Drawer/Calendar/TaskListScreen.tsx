import React from 'react';
import {
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    Dimensions,
    View,
} from 'react-native';
import { TaskListScreenProps } from '../../../shared/models';
import { Screen } from '../../../components/Screen';
import { Text, Layout } from '@ui-kitten/components';
import { openDrawerAction } from '../../../shared/components';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskListItem } from '../../../components/TaskList/TaskListItem';

export const TaskListScreen = (props: TaskListScreenProps) => {
    const tasks = useSelector((state) => state.taskReducer.tasks);
    // const windowWidth = Dimensions.get('window').width;

    const onSwapPressHandler = () => {
        Alert.alert('', 'Are you sure you want to switch with someone?', [
            { text: 'Cancel' },
            { text: 'Ok', onPress: () => console.log('pressed ok') }, //make api call, display loading screen until call response is ok
        ]);
    };

    const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    const rightAccessory = () => (
        <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ flexWrap: 'wrap', paddingRight: 10 }}
        >
            <Text category={'s1'}> View as</Text>
            <Text category={'s1'}>Calendar</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => <TaskListItem item={item} />;

    return (
        <Screen
            title={() => (
                <Text category="h3" status="basic">
                    My Duties
                </Text>
            )}
            accessoryRight={rightAccessory}
            accessoryLeft={leftAccessory}
        >
            <Layout
                style={{
                    flex: 1,
                    width: '100%',
                }}
            >
                <LinearGradient
                    colors={['#EDEEF3', '#FFFFFF']}
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    {tasks.length > 0 ? (
                        <FlatList
                            contentContainerStyle={{
                                width: '80%',
                                alignItems: 'center',
                            }}
                            data={tasks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text>You have nothing assigned!</Text>
                    )}
                </LinearGradient>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    list: {
        borderWidth: 1,
        height: 60,
        width: 200,
        alignItems: 'center',
    },
});
