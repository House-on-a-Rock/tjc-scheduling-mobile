import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';
import { createCalendar } from '../store/actions';
import { LoadingPage } from '../components/LoadingPage';

const AppNavigation = () => {
    const dispatch = useDispatch();
    const areTasksLoaded: boolean = useSelector(({ taskReducer }) => taskReducer.loaded);
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    if (!isLoggedIn) return <AuthenticationStack />;

    dispatch(createCalendar());
    return areTasksLoaded ? <DrawerNav /> : <LoadingPage />;
};

export default AppNavigation;
