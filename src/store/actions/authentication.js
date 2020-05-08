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
        console.log('inside checkCredentials');
        let dummyId = 1;
        let profile = null;
        await axios
            .get(secret_ip + '/api/authentication/getUser', { params: { id: 1 } })
            .then((response) => {
                console.log('response: ', response.data);
                profile = response.data;
            })
            .catch((error) => console.error(error));

        dispatch({
            type: SET_PROFILE,
            payload: profile,
        });
    };
};
