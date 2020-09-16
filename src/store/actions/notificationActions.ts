import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { NotificationStateActions } from './loadStateActions';
import { errorDataExtractor } from '../helper';

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

export const setNotifications = (notifications) => {
    return {
        type: SET_NOTIFICATIONS,
        payload: notifications,
    };
};

function getNotifications(userId) {
    return axios.get(secretIp + `/api/notifications/${userId}`);
}

export const fetchNotificationsOnLogin = () => {
    console.log('grabbing notifications');
    return async (dispatch) => {
        dispatch(NotificationStateActions.Loading());
        let accesskey = await AsyncStorage.getItem('access_token');
        const userId = extractId(accesskey);
        try {
            const { data: notifications } = await getNotifications(userId);
            console.log('notifications', notifications);
            dispatch(setNotifications(notifications));
            dispatch(NotificationStateActions.Loaded());
        } catch (error) {
            console.log('error in profile', error);
            const errorData = errorDataExtractor(error);
            return dispatch(NotificationStateActions.Error(errorData));
        }
    };
};
