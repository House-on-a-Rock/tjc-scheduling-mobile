import axios from 'axios';
import { SET_PROFILE } from './profileActions';
import { secret_ip } from '../../../secrets/secrets';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (profile) => {
    return {
        type: LOGIN,
        payload: profile,
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
        let dummyId = 1;
        let profile = null;
        await axios
            .get(secret_ip + '/api/authentication/getUser', { params: { id: dummyId } })
            .then((response) => {
                profile = response.data;
            })
            .catch((error) => console.error(error));

        await axios
            .get(secret_ip + '/api/authentication/getUserTasks', {
                params: { id: dummyId },
            })
            .then((response) => {
                profile.tasks = response.data;
            })
            .catch((error) => console.error(error));

        dispatch({
            type: SET_PROFILE,
            payload: profile,
        });
    };
};
