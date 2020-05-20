import React from 'react';
import { ScheduleScreen } from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleStackParamList } from '../../../shared/models/navigation';
import { stackOptions } from '../../../shared/components';

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
