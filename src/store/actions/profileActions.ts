import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { ProfileData } from '../../shared/models';
import { secretIp } from '../../../secrets/secrets';
import { fetchTasksOnLogin } from './taskActions';

export const loadingProfile = () => {
    return {
        type: ProfileActionTypes.LOADING,
    };
};

export const loadProfileSuccess = (profile: ProfileData) => {
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
        let accesskey = await AsyncStorage.getItem('access_token');
        console.log(typeof accesskey, accesskey);
        dispatch(loadingProfile());
        await axios
            .get(secretIp + '/api/users/getUser', {
                headers: {
                    authorization: accesskey,
                },
            })
            .then((response) => {
                let userProfile = response.data;
                dispatch(loadProfileSuccess(userProfile));
                dispatch(fetchTasksOnLogin(userProfile.id));
            })
            .catch((error) => {
                // dispatch(authError())
                console.log(error);
            });

        await AsyncStorage.clear();
    };
};
