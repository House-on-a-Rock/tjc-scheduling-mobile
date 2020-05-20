import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SettingsScreenProps } from '../../shared/models/navigation';

export const SettingsScreen = (props: SettingsScreenProps) => {
    return (
        <View>
            <Text>This is the settings screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
