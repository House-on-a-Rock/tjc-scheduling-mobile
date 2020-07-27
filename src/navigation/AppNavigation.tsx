import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
YellowBox.ignoreWarnings(['Require cycle']);

const AppNavigation = () => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) return <AuthenticationStack />;

    return <DrawerNav />;
};

export default AppNavigation;
