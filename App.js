import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AppNavigation from './src/navigation/AppNavigation';
import { createStore, combineReducers } from 'redux';
import { authReducer, profileReducer, calendarReducer } from './src/store/reducers/';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    calendarReducer: calendarReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto-Bold': require('./src/assets/Fonts/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./src/assets/Fonts/Roboto-Italic.ttf'),
        'Roboto-Regular': require('./src/assets/Fonts/Roboto-Regular.ttf'),
    });
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);

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
            <View style={styles.app}>
                <AppNavigation />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    app: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
});
