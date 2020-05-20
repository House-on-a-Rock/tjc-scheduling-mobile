import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';

const AppNavigation = () => {
    let isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    return isLoggedIn ? <DrawerNav /> : <AuthenticationStack />;
};

export default AppNavigation;
