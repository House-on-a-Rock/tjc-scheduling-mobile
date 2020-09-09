import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';

interface DashboardProps {
    navigation;
}

export const DashboardScreen = (props: DashboardProps) => {
    return (
        <Layout style={{ flex: 1 }}>
            <Text>This is the dashboard</Text>
        </Layout>
    );
};

const styles = StyleSheet.create({});
