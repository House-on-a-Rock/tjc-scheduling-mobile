import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';
import { LoadingPage } from '../components/LoadingPage';
import { ErrorPage } from '../components/ErrorPage';

const AppNavigation = () => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    if (!isLoggedIn) return <AuthenticationStack />;

    return <DrawerNav />;
};

export default AppNavigation;
