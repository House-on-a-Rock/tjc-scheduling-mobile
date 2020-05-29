import axios from 'axios';
import { setProfile } from './profileActions';
import { changeLoadState, states } from './loadState';
import { createCalendar } from './calendarActions';
import { secretIp } from '../../../secrets/secrets';

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
            .get(secretIp + '/api/authentication/authenticate', {
                params: { email: email, password: password },
            })
            .then((response) => {
                // jwt token a
            });
        // let jwt;
        //check credentials api call
        // await axios
        //     .get(secretIp + '/api/authentication/login', {
        //         params: { email: email, password: password },
        //     })
        //     .then((response) => (jwt = response.data))
        //     .catch((error) => console.log(error));

        // await axios
        //     .get(secretIp + '/api/authentication/getUser', { params: { id: dummyId } })
        //     .then((response) => {
        //         profile = response.data;
        //     })
        //     .catch((error) => console.error(error));

        // await axios
        //     .get(secretIp + '/api/authentication/getUserTasks', {
        //         params: { id: dummyId },
        //     })
        //     // .then((response) => {
        //     //     profile.tasks = response.data;
        //     // })
        //     .then(() => {
        //         dispatch(changeLoadState(states.loaded));
        //         // dispatch(setProfile(profile));
        //         // dispatch(createCalendar());
        //         dispatch(login());
        //     })
        //     .catch((error) => console.error(error));
    };
};

const getProfileData = ({ user }) => {};
