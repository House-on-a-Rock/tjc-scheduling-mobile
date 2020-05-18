import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// import { LogOutScreen } from '../..';
import { LogoutScreen } from '../../screens/Drawer/LogoutScreen';
import { stackOptions, DrawerStackParamList } from '..';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

type LogoutParamList = {
    Logout: undefined;
};

// navigation prop for l.o stack
export type LogoutStackNavigationProp = CompositeNavigationProp<
    StackNavigationProp<LogoutParamList, 'Logout'>,
    StackNavigationProp<DrawerStackParamList>
>;

// type LogoutScreenRouteProp = RouteProp<LogoutParamList, 'Logout'>;

// type Props = {
//     route: LogoutScreenRouteProp;
//     navigation: LogoutNavigationProp;
// };

const LogOutStack = createStackNavigator<LogoutParamList>();

export const LogoutStack = (props) => {
    return (
        <LogOutStack.Navigator>
            <LogOutStack.Screen
                name="Logout"
                component={LogoutScreen}
                options={stackOptions}
            />
        </LogOutStack.Navigator>
    );
};
