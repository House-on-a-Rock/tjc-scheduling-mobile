import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { ThemeContext } from '../../../ui/theme-context';

export const GeneralSettingsScreen = (props) => {
    const themeContext = React.useContext(ThemeContext);
    return (
        <Layout>
            <Text>General settings in here!</Text>
            <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>
                TOGGLE THEME
            </Button>
        </Layout>
    );
};
