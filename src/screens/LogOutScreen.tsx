import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { logout } from '../store/actions';
import { useDispatch } from 'react-redux';

export const LogOutScreen = (props) => {
    const profile = profile;
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
