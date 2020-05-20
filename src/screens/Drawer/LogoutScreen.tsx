import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { logout } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { LogoutScreenProps } from '../../shared/models/navigation';

export const LogoutScreen = (props: LogoutScreenProps) => {
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
