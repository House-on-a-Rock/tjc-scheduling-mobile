import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { fetchProfileAndTasksOnLogin } from './profileActions';
import { createCalendar } from './calendarActions';
import { store } from '../../../App';

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
    console.log('prepping Home Page');
    dispatch(fetchProfileAndTasksOnLogin());
};

export const checkCredentials = ({ email, password }) => {
    //hash password then check

    return async (dispatch) => {
        let dummyId = 1;
        let profile = null;

        await axios
            .post(`${secret_database.dev.ISSUER_BASE_URL}/oauth/token`, {
                grant_type: 'password',
                username: 'shaun.tung@gmail.com',
                password: 'password',
                client_id: secret_database.dev.CLIENT_ID,
                client_secret: secret_database.dev.CLIENT_SECRET,
                audience: secret_database.dev.AUDIENCE,
                scope: 'openid profile email read:AllUsers',
            })
            .then((response) => {
                AsyncStorage.setItem('access_token', response.data.access_token);
            })
            .then(() => prepHomePage(dispatch))
            .catch((error) => {
                // dispatch(authError())
                console.log(error);
            });

        await AsyncStorage.clear();
    };
};

const getProfileData = ({ user }) => {};
