import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { logout } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { LogoutStackNavigationProp } from 'src/navigation/Drawer/LogoutStack';

// navigation prop for l.o screen
//
3;

// type Props = {
//     route: LogoutScreenRouteProp;
//     navigation: LogoutNavigationProp;
// };

export const LogoutScreen = (props) => {
    // const profile = props;
    const dispatch = useDispatch();

    return (
        <View>
            <Text>This is the LogOutScreen</Text>
            <Button title="Log Out" onPress={() => dispatch(logout())} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
