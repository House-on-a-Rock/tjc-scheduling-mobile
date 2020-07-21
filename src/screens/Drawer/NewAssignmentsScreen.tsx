import React, { useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { Screen } from '../../components';
import { useSelector } from 'react-redux';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { LinearGradient } from 'expo-linear-gradient';
import { openDrawerAction } from '../../shared/components';
import SwipeRow from '../../components/SwipeableItem';
import { windowWidth } from '../../shared/constants/';
import Swipeable from 'react-native-swipeable-row';

interface NewAssignmentsScreenProps {
    route;
    navigation;
    onSwipe;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// if (Platform.OS === 'android') {
//     UIManager.setLayoutAnimationEnabledExperimental &&
//         UIManager.setLayoutAnimationEnabledExperimental(true);
// }

//dummy data
const NUM_ITEMS = 10;
function getColor(i) {
    const multiplier = 255 / (NUM_ITEMS - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}
const initialData = [...Array(NUM_ITEMS)].fill(0).map((d, index) => ({
    text: `Row ${index}`,
    key: `key-${index}`, // Note: It's bad practice to use index as your key. Don't do it in production!
    backgroundColor: getColor(index),
}));

export const NewAssignmentsScreen = (props: NewAssignmentsScreenProps) => {
    //grab new assignments instead of tasks
    // const newAssignments = useSelector((state) => state.taskReducer.tasks);
    const [data, setData] = useState(initialData);

    const leftAccessory = () => openDrawerAction(props.navigation.toggleDrawer);
    const rightAccessory = () => (
        <TouchableOpacity onPress={() => setData(initialData)}>
            <Text category="s1">Delete all</Text>
            <Text category="s1">updates</Text>
        </TouchableOpacity>
    );

    const deleteItem = (item) => {
        const updatedData = data.filter((d) => d !== item);
        // Animate list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setData(updatedData);
    };

    // const leftContent = <Text>Pull to activate</Text>;

    // const rightButtons = [
    //     <TouchableHighlight>
    //         <Text>Button 1</Text>
    //     </TouchableHighlight>,
    //     <TouchableHighlight>
    //         <Text>Button 2</Text>
    //     </TouchableHighlight>,
    // ];

    const renderItem = ({ item, index }) => (
        <SwipeRow key={item.key} item={item} swipeThreshold={200} onSwipe={deleteItem}>
            <Text style={[styles.text, { backgroundColor: item.backgroundColor }]}>
                {item.text}
            </Text>
        </SwipeRow>
        //     <Swipeable leftContent={leftContent} rightButtons={rightButtons}>
        //     <Text style={[styles.text, { backgroundColor: item.backgroundColor }]}>
        //         {item.text}
        //     </Text>
        // </Swipeable>
    );

    return (
        <Screen
            title={() => <Text category="h5">New Assignments</Text>}
            accessoryLeft={leftAccessory}
            accessoryRight={rightAccessory}
        >
            <Layout style={styles.layout}>
                <LinearGradient
                    colors={['#EDEEF3', '#FFFFFF']}
                    style={{ flex: 1, width: '100%', alignItems: 'center' }}
                >
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        // keyExtractor={(item, index) => index.toString() + item.toString()}  //messes with layout animation
                        contentContainerStyle={{ width: windowWidth }}
                    />
                </LinearGradient>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        // height: '100%',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32,
        flex: 1,
        textAlign: 'center',
        padding: 25,
    },
});
