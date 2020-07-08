import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';

const AppNavigation = () => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) return <AuthenticationStack />;

    return <DrawerNav />;
};

export default AppNavigation;
