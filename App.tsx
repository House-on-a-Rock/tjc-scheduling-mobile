import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import {
    authReducer,
    profileReducer,
    calendarReducer,
    taskReducer,
    loadStateReducer,
} from './src/store/reducers';

//ui kitten imports
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as ui from './src/ui';
import { default as mapping } from './src/ui/mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/ui/theme-context';

const rootReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    calendarReducer: calendarReducer,
    taskReducer: taskReducer,
    loadStateReducer: loadStateReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto-Bold': require('./src/assets/Fonts/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./src/assets/Fonts/Roboto-Italic.ttf'),
        'Roboto-Regular': require('./src/assets/Fonts/Roboto-Regular.ttf'),
        'OpenSans-Regular': require('./src/assets/Fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('./src/assets/Fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./src/assets/Fonts/OpenSans-SemiBold.ttf'),
    });
};

const App: React.FC = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider
                    {...eva}
                    theme={ui[theme]}
                    customMapping={mapping} //fonts
                >
                    <View style={styles.app}>
                        <AppNavigation />
                    </View>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
});

export default App;
