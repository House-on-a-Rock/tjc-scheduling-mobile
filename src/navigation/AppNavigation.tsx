import React from 'react';
import { useSelector } from 'react-redux';
import { AuthenticationStack, DrawerNav } from './index';

const AppNavigation = () => {
    let isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    // const calCardDate = useSelector((state) => state.calendarReducer.dateArray);
    // console.log('appnavigation!!!!!!', calCardDate);
    return isLoggedIn ? <DrawerNav /> : <AuthenticationStack />;
};

export default AppNavigation;
