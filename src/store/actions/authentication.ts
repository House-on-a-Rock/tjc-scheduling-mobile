import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setProfile } from './profileActions';
import { changeLoadState, states } from './loadState';
import { createCalendar } from './calendarActions';
import { secretIp, secret_database } from '../../../secrets/secrets';

axios.interceptors.request.use((request) => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use((response) => {
    console.log('Response: ', response);
    return response;
});

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

export const checkCredentials = ({ email, password }) => {
    //hash password then check

    return async (dispatch) => {
        dispatch(changeLoadState(states.loading));
        let dummyId = 1;
        let profile = null;

        await axios
            .post(`${secret_database.dev.ISSUER_BASE_URL}/oauth/token`, {
                grant_type: 'password',
                username: email,
                password: password,
                client_id: secret_database.dev.CLIENT_ID,
                client_secret: secret_database.dev.CLIENT_SECRET,
                audience: secret_database.dev.AUDIENCE,
                scope: 'openid profile email read:AllUsers',
            })
            .then((response) => {
                console.log(response);
                const _storeData = async () => {
                    try {
                        await AsyncStorage.setItem('access_token', response.data);
                    } catch (error) {
                        console.log(error);
                    }
                };
            })
            .catch((error) => console.log(error));

        await axios
            .get(secretIp + '/api/authentication/getUser', { params: { id: dummyId } })
            .then((response) => {
                profile = response.data;
            })
            .catch((error) => console.error(error));

        await axios
            .get(secretIp + '/api/authentication/getUserTasks', {
                params: { id: dummyId },
            })
            .then((response) => {
                profile.tasks = response.data;
            })
            .then(() => {
                dispatch(changeLoadState(states.loaded));
                dispatch(setProfile(profile));
                dispatch(createCalendar());
                dispatch(login());
            })
            .catch((error) => console.error(error));
    };
};
