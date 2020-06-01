import axios from 'axios';
import { ProfileData } from '../../shared/models';
import { secretIp } from '../../../secrets/secrets';
import { fetchTasksOnLogin } from './taskActions';

export const loadingProfile = () => {
    return {
        type: ProfileActionTypes.LOADING,
    };
};

export const loadProfileSuccess = (profile: ProfileData) => {
    console.log('loadProfileSuccess', profile);
    return {
        type: ProfileActionTypes.LOADED,
        payload: profile,
    };
};

export const editProfile = (profile: ProfileData) => {};

export const ProfileActionTypes = {
    LOADING: 'Profile Loading',
    LOADED: 'Profile Loaded',
    SAVING: 'Profile Saving',
    SAVED: 'Profile Saved',
    LOAD_ERROR: 'Profile Load Error',
    SAVE_ERROR: 'Profile Save Error',
};

// Thunky thunk

export const fetchProfileAndTasksOnLogin = () => {
    return async (dispatch) => {
        console.log('dispatched fetch profile');
        dispatch(loadingProfile());
        await axios
            .get(secretIp + '/api/users/getUser')
            .then((response) => {
                let userProfile = response.data;
                dispatch(loadProfileSuccess(userProfile));
                dispatch(fetchTasksOnLogin(userProfile.id));
            })
            .catch((error) => {
                // dispatch(authError())
                console.log(error);
            });
    };
};
