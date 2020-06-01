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
        let dummyId = 1;
        let profile = null;

        //check credentials api call

        await axios
            .post(`${secret_database.dev.ISSUER_BASE_URL}/oauth/token`, {
                username: email,
                password: password,
                grant_type: 'password',
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
                console.log('authentication error: ', error);
            });

        let accesskey = await AsyncStorage.getItem('access_token');
        console.log(accesskey);
        let decoded = jwtDecode(accesskey);
        console.log(decoded);
        let id_string = decoded.sub.split('|')[1];
        dummyId = parseInt(id_string);
        console.log(id_string, dummyId);
        await axios
            .get(secretIp + '/api/authentication/getUser', {
                params: { id: dummyId },
                headers: {
                    authorization: `Bearer ${accesskey}`,
                },
            })
            .then((response) => {
                profile = response.data;
            })
            .catch((error) => console.error(error));

        await AsyncStorage.clear();
    };
};

const getProfileData = ({ user }) => {};
