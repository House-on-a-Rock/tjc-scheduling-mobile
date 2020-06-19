import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '../../screens';
import { stackOptions } from '../../shared/components';
import { ScheduleStackParamList } from '../../shared/models';

const SchedStack = createStackNavigator<ScheduleStackParamList>();

export const ScheduleStack = (props) => {
    return (
        <SchedStack.Navigator>
            <SchedStack.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={stackOptions}
            />
        </SchedStack.Navigator>
    );
};
