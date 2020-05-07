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
        let dummyId = 3;
        let profile = {};
        fetch(secret_ip + '/api/users/getUser', {
            params: { id: dummyId },
        }).then((response) => {
            console.log('response', response.data);
            profile = response.data;
        });

        dispatch({
            type: SET_PROFILE,
            payload: profile,
        });
    };
};
