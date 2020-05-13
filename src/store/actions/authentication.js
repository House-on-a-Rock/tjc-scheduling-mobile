import axios from 'axios';
import { setProfile } from './profileActions';
import { createCalendar } from './calendarActions';
import { secret_ip } from '../../../secrets/secrets';
import { changeLoadState, states } from './loadState';

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
        dispatch(changeLoadState(states.loading));
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
            .then(() => {
                dispatch(changeLoadState(states.loaded));
            })
            .catch((error) => console.error(error));

        dispatch(setProfile(profile));

        dispatch(createCalendar());
    };
};
