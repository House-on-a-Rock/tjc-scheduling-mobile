import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
// import axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import {
    authReducer,
    profileReducer,
    calendarReducer,
    taskReducer,
} from './src/store/reducers';

const rootReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    calendarReducer: calendarReducer,
    taskReducer: taskReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto-Bold': require('./src/assets/Fonts/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./src/assets/Fonts/Roboto-Italic.ttf'),
        'Roboto-Regular': require('./src/assets/Fonts/Roboto-Regular.ttf'),
    });
};

const App: React.FC = () => {
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
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
});

export default App;
