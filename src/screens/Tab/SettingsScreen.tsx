import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SettingsScreenProps } from '../../shared/models';
import { Button, Text } from '@ui-kitten/components';
import { ThemeContext } from '../../ui/theme-context';
import { Screen } from '../../components/Screen';
import { Layout } from '@ui-kitten/components';
import { openDrawerAction } from '../../shared/components';

export const SettingsScreen = (props: SettingsScreenProps) => {
    const themeContext = React.useContext(ThemeContext);
    return (
        <Screen
            title={() => <Text category="h2">Settings</Text>}
            accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        >
            <Layout style={{ flex: 1 }}>
                <Text>This is the settings screen</Text>
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>
                    TOGGLE THEME
                </Button>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({});
