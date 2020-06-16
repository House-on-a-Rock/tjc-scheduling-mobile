import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { fetchProfileOnLogin } from './profileActions';
import { fetchTasksOnLogin } from './taskActions';
import { AuthStateActions } from './loadStateActions';
import { createCalendar } from './calendarActions';
import { errorDataExtractor } from '../helper';

export const prepHomePage = async (dispatch) => {
    dispatch(fetchProfileOnLogin());
    dispatch(fetchTasksOnLogin());
    dispatch(createCalendar());
};

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

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

function getAuth(email, password) {
    return axios.post(secretIp + `/api/authentication/login`, {
        email: email,
        password: password,
    });
}

function recoverEmail(email) {
    return axios.post(secretIp + `/api/authentication/sendResetEmail`, {
        email: email,
    });
}

/* Thunk */

export const checkCredentials = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        try {
            const response = await getAuth(email, password);
            AsyncStorage.setItem('access_token', response.data.access_token);
            prepHomePage(dispatch);
            dispatch(AuthStateActions.Loaded());
        } catch (error) {
            const errorData = errorDataExtractor(error);
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
