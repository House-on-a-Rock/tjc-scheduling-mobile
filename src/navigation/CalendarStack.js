import React from 'react';
import { CalendarScreen, DateDetailScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../assets/colors';
import { Platform } from 'react-native';

const calStack = createStackNavigator();

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
        <calStack.Navigator>
            <calStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={stackOptions}
            />
            <calStack.Screen
                name="DateDetails"
                component={DateDetailScreen}
                options={stackOptions}
            />
        </calStack.Navigator>
    );
};
