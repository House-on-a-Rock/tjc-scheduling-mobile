import React from 'react';
import { TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';
import { settingStackNames } from '../../../navigation/';

export const SettingsScreen = (props) => {
    const settingSelection = [
        {
            title: 'Notifications',
            navigationTarget: settingStackNames.General,
        },
        {
            title: 'Password & Account',
            navigationTarget: settingStackNames.General,
        },
        {
            title: 'General',
            navigationTarget: settingStackNames.General,
        },
        {
            title: 'Privacy and Policy',
            navigationTarget: settingStackNames.General,
        },
        {
            title: 'Logout',
            navigationTarget: settingStackNames.Logout,
        },
    ];

    const render = ({ item }) => {
        return (
            <Layout
                style={{
                    justifyContent: 'center',
                    paddingLeft: 40,
                    paddingVertical: 20,
                    borderWidth: 1,
                    borderColor: '#BCBCBC',
                    borderRadius: 10,
                    margin: 10,
                }}
            >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate(item.navigationTarget)}
                >
                    <Text category="h4" status="basic">
                        {item.title}
                    </Text>
                </TouchableOpacity>
            </Layout>
        );
    };

    return (
        // <Screen
        //     title={() => <Text category="h2">Settings</Text>}
        //     accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        // >
        <Layout style={{ flex: 1 }}>
            <FlatList
                data={settingSelection}
                keyExtractor={(item, index) => `${item.title}+${index}`}
                renderItem={render}
            />
        </Layout>
        // </Screen>
    );
};

const styles = StyleSheet.create({});
