import React from 'react';
import { CalendarScreen, TasksScreen } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/themes';

const calStack = createStackNavigator();

export const CalendarStack = (props) => {
    return (
        <calStack.Navigator>
            <calStack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    headerStyle: {
                        // backgroundColor: colors.backgroundColor,
                    },
                    headerLeft: () => (
                        <Ionicons
                            name="ios-menu"
                            size={35}
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                            style={{ paddingLeft: 20 }}
                        />
                    ),
                }}
            />
            <calStack.Screen name="DateDetails" component={TasksScreen} />
        </calStack.Navigator>
    );
};
