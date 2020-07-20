import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewAssignmentsScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { LogoutStackParamList } from '../../shared/models';

const NewAssignments = createStackNavigator<LogoutStackParamList>();

export const NewAssignmentsStack = (props) => {
    return (
        <NewAssignments.Navigator headerMode="none">
            <NewAssignments.Screen
                name="New Assignments"
                component={NewAssignmentsScreen}
                // options={stackOptions}
            />
        </NewAssignments.Navigator>
    );
};
