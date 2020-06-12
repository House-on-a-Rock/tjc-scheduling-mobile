import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { fetchProfileAndTasksOnLogin } from './profileActions';
import { AuthStateActions } from './loadStateActions';
import { createCalendar } from './calendarActions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTH_ERROR = 'AUTH_ERROR';

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

export const checkCredentials = ({ email, password }) => {
    return async (dispatch) => {
        await axios
            .post(secretIp + `/api/authentication/login`, {
                email: email,
                password: password,
            })
            .then((response) => {
                AsyncStorage.setItem('access_token', response.data.access_token);
                dispatch(createCalendar());
            })
            .then(() => dispatch(fetchProfileAndTasksOnLogin()))
            .then(() => dispatch(AuthStateActions.Loaded()))
            .then(() => dispatch(login()))
            .catch((error) => {
                console.log('authentication error: ', error);
                return dispatch(AuthStateActions.Error(error));
            });
    };
};
