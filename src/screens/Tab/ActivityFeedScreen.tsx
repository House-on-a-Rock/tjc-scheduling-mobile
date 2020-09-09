import React, { useState } from 'react';
import {
    Layout,
    Text,
    Autocomplete,
    AutocompleteItem,
    Icon,
} from '@ui-kitten/components';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeRow from '../../components/SwipeableItem';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { windowWidth } from '../../shared/constants';

interface ActivityFeedProps {
    route;
    navigation;
    onSwipe;
}

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ActivityFeedScreen = (props: ActivityFeedProps) => {
    //grab new assignments instead of tasks
    const newAssignments = useSelector((state) => state.taskReducer.tasks);
    const [data, setData] = useState(newAssignments);
    const deleteThreshold = windowWidth * 0.3;

    const deleteItem = (taskId) => {
        const updatedData = data.filter((d) => d.taskId !== taskId);

        // Animate list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(updatedData);
    };

    const renderItem = ({ item, index }) => (
        <SwipeRow
            swipeThreshold={deleteThreshold}
            onSwipe={deleteItem}
            itemId={item.taskId}
        >
            <NewAssignmentItem item={item} />
        </SwipeRow>
    );

    //uikitten example
    const autoCompleteData = [
        { title: 'Star Wars' },
        { title: 'Back to the Future' },
        { title: 'The Matrix' },
        { title: 'Inception' },
        { title: 'Interstellar' },
    ];
    const filter = (item, query) =>
        item.title.toLowerCase().includes(query.toLowerCase());

    const StarIcon = (props) => <Icon {...props} name="star" />;
    const [value, setValue] = React.useState(null);
    const [autoData, setAutoData] = React.useState(autoCompleteData);

    const onSelect = (index) => {
        setValue(autoData[index].title);
    };

    const onChangeText = (query) => {
        setValue(query);
        setAutoData(autoCompleteData.filter((item) => filter(item, query)));
    };

    const clearInput = () => {
        setValue('');
        setAutoData(autoCompleteData);
    };

    const renderOption = (item, index) => (
        <AutocompleteItem key={index} title={item.title} accessoryLeft={StarIcon} />
    );

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon {...props} name="close" />
        </TouchableWithoutFeedback>
    );
    //end autocomplete example

    return (
        <Layout style={styles.layout}>
            <LinearGradient
                colors={['#EDEEF3', '#FFFFFF']}
                style={{ flex: 1, width: '100%', alignItems: 'center' }}
            >
                <Autocomplete
                    placeholder="Place your Text"
                    value={value}
                    accessoryRight={renderCloseIcon}
                    onChangeText={onChangeText}
                    onSelect={onSelect}
                    style={{ width: 300 }}
                >
                    {autoData.map(renderOption)}
                </Autocomplete>
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.taskId.toString()}
                    />
                ) : (
                    <Text>You don't have any new assignments!</Text>
                )}
            </LinearGradient>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
});
