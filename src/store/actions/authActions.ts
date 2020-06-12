import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { fetchProfileAndTasksOnLogin } from './profileActions';
import { AuthStateActions } from './loadStateActions';
import { createCalendar } from './calendarActions';

export const prepHomePage = (dispatch) => {
    dispatch(fetchProfileAndTasksOnLogin());
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

/* Thunk */

export const checkCredentials = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(AuthStateActions.Loading());
        await axios
            .post(secretIp + `/api/authentication/login`, {
                email: email,
                password: password,
            })
            .then((response) => {
                AsyncStorage.setItem('access_token', response.data.access_token);
            })
            .then(() => {
                dispatch(login());
                prepHomePage(dispatch);
                dispatch(AuthStateActions.Loaded());
            })
            .catch((error) => {
                dispatch(AuthStateActions.Error(error));
                console.log('authentication error: ', error);
            });
    };
};
