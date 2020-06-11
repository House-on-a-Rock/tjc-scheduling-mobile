import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import { fetchProfileAndTasksOnLogin } from './profileActions';
import { createCalendar } from './calendarActions';
// import { store } from '../../../App';

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

export const prepHomePage = (dispatch) => {
    dispatch(fetchProfileAndTasksOnLogin());
};

export const checkCredentials = ({ email, password }) => {
    return async (dispatch) => {
        //check credentials api call

        await axios
            .post(secretIp + `/api/authentication/login`, {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                AsyncStorage.setItem('access_token', response.data.access_token);
            })
            .then(() => prepHomePage(dispatch))
            .catch((error) => {
                // dispatch(authError())
                console.log('authentication error: ', error);
            });
    };
};

export const clearData = () => {};
