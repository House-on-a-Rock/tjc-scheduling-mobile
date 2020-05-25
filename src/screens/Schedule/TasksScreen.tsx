import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export const TasksScreen = ({ route }) => {
    const { taskDetails } = route.params;

    const onSwapPressHandler = () => {
        console.log('swap was pressed');
    };

    const render = ({ item }) => {
        return (
            <View style={styles.list}>
                <Text style={{ fontSize: 23 }}>{item.church.name} </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'stretch',
                        width: '100%',
                    }}
                >
                    <Text style={{ fontSize: 25 }}>{item.role.name}</Text>
                    <TouchableOpacity>
                        <Entypo
                            name={'swap'}
                            size={25}
                            color={'rgba(58, 135, 211, 0.82)'}
                            onPress={onSwapPressHandler}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Text style={{ fontSize: 30, paddingVertical: 20 }}>
                Tasks for {route.params.name}
            </Text>
            <View
                style={{
                    flex: 1,
                    width: '90%',
                    alignItems: 'center',
                }}
            >
                <FlatList
                    contentContainerStyle={{
                        width: 300,
                        flex: 1,

                        alignItems: 'center',
                    }}
                    data={taskDetails}
                    renderItem={render}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
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
