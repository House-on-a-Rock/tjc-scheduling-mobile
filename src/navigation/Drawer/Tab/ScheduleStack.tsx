import React from 'react';
import { ScheduleScreen } from '../../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheStackParamList } from '../../models';
import { stackOptions } from '../../shared';

const ScheStack = createStackNavigator<ScheStackParamList>();

export const ScheduleStack = (props) => {
    return (
        <ScheStack.Navigator>
            <ScheStack.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={stackOptions}
            />
        </ScheStack.Navigator>
    );
};
