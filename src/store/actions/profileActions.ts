import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { fetchTasksOnLogin } from './taskActions';
import { ProfileStateActions } from './loadStateActions';

export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile,
    };
};

export const fetchProfileAndTasksOnLogin = () => {
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
                dispatch(fetchTasksOnLogin());
            })
            .catch((error) => {
                dispatch(ProfileStateActions.Error(error));
                console.log('error fetching profile', error);
            });

        await AsyncStorage.clear();
    };
};
