import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { fetchTasksOnLogin } from './taskActions';
import { ProfileStateActions, AuthStateActions } from './loadStateActions';

export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile,
    };
};

export const fetchProfileOnLogin = () => {
    return async (dispatch) => {
        let accesskey = await AsyncStorage.getItem('access_token');
        const userId = extractId(accesskey);
        dispatch(ProfileStateActions.Loading());
        await axios
            .get(secretIp + '/api/users/getUser', {
                params: { id: userId },
                headers: {
                    authorization: accesskey,
                },
            })
            .then((response) => {
                let userProfile = response.data;
                dispatch(setProfile(userProfile));
                dispatch(ProfileStateActions.Loaded());
            })
            .catch((error) => {
                console.log('error fetching profile', error);
                return dispatch(ProfileStateActions.Error(error));
            });

        await AsyncStorage.clear();
    };
};
