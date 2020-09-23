import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, BottomTabs } from './index';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
YellowBox.ignoreWarnings([
    'Require cycle',
    'Cannot update during an existing state transition',
]);

const AppNavigation = () => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) return <AuthenticationStack />;

    return <BottomTabs />;
};

export default AppNavigation;
