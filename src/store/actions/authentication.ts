import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { fetchProfileAndTasksOnLogin } from './profileActions';
import { secretIp, secret_database } from '../../../secrets/secrets';

// axios.interceptors.request.use((request) => {
//     console.log('Starting Request', request);

//     return request;
// });

// axios.interceptors.response.use((response) => {
//     console.log('Response: ', response);
//     return response;
// });

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

export const authError = () => {
    return {
        type: AUTH_ERROR,
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
            })
            .then(() => dispatch(fetchProfileAndTasksOnLogin()))
            .catch((error) => {
                dispatch(authError());
                console.log('authentication error: ', error);
            });
    };
};
