import React from 'react';
import { CalendarScreen, TasksScreen } from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

type CalStackParamList = {
    Calendar: undefined;
    Tasks: undefined;
};

const CalStack = createStackNavigator<CalStackParamList>();

export const CalendarStack = (props) => {
    const stackOptions = {
        headerLeft: () => (
            <Ionicons
                name="ios-menu"
                size={35}
                onPress={() => {
                    props.navigation.toggleDrawer();
                }}
                style={{ paddingLeft: 20, paddingBottom: Platform.OS === 'ios' ? 20 : 0 }}
            />
        ),
    };

    return (
        <CalStack.Navigator>
            <CalStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={stackOptions}
            />
            <CalStack.Screen
                name="Tasks"
                component={TasksScreen}
                options={stackOptions}
            />
        </CalStack.Navigator>
    );
};
