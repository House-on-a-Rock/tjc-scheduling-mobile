import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LogoutScreenProps } from '../../shared/models';
import { logout } from '../../store/actions';

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
