import * as React from 'react';
const { useCallback, useState } = React;
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import SwipeRow from '../../components/SwipeableRow';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

export class ActivityFeedScreen extends React.Component {
    state = {
        data: initialData,
    };

    deleteItem = (item) => {
        const updatedData = this.state.data.filter((d) => d !== item);
        // Animate list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ data: updatedData });
    };

    renderItem = ({ item, index }) => (
        <SwipeRow
            key={item.key}
            item={item}
            swipeThreshold={-150}
            onSwipe={this.deleteItem}
        >
            <Text style={[styles.text, { backgroundColor: item.backgroundColor }]}>
                {item.text}
            </Text>
        </SwipeRow>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.data} renderItem={this.renderItem} />
            </View>
        );
    }
}

// export default ActivityFeedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
