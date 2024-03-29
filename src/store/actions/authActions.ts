import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { fetchProfileOnLogin } from './profileActions';
import { fetchTasksOnLogin } from './taskActions';
import { fetchNotificationsOnLogin } from './notificationActions';
import { AuthStateActions } from './loadStateActions';

import { createCalendar } from './calendarActions';
import { errorDataExtractor, ErrorData } from '../helper';
import { timeoutPromise } from '../../services/API/api_helper_functions';

export const prepHomePage = async (dispatch) => {
    dispatch(fetchProfileOnLogin());
    dispatch(fetchTasksOnLogin());
    dispatch(fetchNotificationsOnLogin());
    dispatch(createCalendar());
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

/* Action */

export const login = () => {
    return {
        type: LOGIN,
    };
};

export const logout = () => {
    return {
        type: LOGOUT,
    };
};

function getAuth(email: string, password: string) {
    return axios.post(secretIp + `/api/authentication/login`, {
        email: email,
        password: password,
    });
}

function recoverEmail(email: string) {
    return axios.post(secretIp + `/api/authentication/sendResetEmail`, {
        email: email,
    });
}

/* Thunk */

export const checkCredentials = (email: string, password: string) => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        try {
            const response = await Promise.race([
                getAuth(email, password),
                timeoutPromise(),
            ]);
            AsyncStorage.setItem('access_token', response.data.access_token);
            //sets headers for all future axios calls to use the access token for 'authorization' property
            axios.defaults.headers.common['authorization'] = response.data.access_token;
            prepHomePage(dispatch);
            dispatch(AuthStateActions.Loaded());
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            return dispatch(AuthStateActions.Error(errorData));
        }
    };
};

export const sendResetEmail = (email) => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        try {
            const response = await recoverEmail(email);
            dispatch(AuthStateActions.Loaded());
        } catch (error) {
            const errorData = errorDataExtractor(error);
            return dispatch(AuthStateActions.Error(errorData));
        }
    };
};
