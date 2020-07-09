import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';
import { RequestSwapStack } from './RequestSwap/RequestSwapStack';

const AppNavigation = () => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) return <AuthenticationStack />;

    return <DrawerNav />;
};

export default AppNavigation;
