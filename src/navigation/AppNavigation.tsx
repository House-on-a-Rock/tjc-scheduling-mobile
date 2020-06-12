import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';
import { LoadingPage } from '../components/LoadingPage';

const AppNavigation = () => {
    const areTasksLoaded: string = useSelector(
        ({ loadStateReducer }) => loadStateReducer.loadStatus.TASKS,
    );
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    console.log(areTasksLoaded, isLoggedIn);
    if (!isLoggedIn) return <AuthenticationStack />;

    return areTasksLoaded === 'LOADED' ? <DrawerNav /> : <LoadingPage />;
};

export default AppNavigation;
