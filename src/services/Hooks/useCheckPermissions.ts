import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { secretIp } from '../../../secrets/secrets';
import { AsyncStorage } from 'react-native';
import { extractId } from '../../store/helper';

export const useCheckPermissions = async () => {
    let accesskey = await AsyncStorage.getItem('access_token');
    const userId = extractId(accesskey);
    return Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then((statusObj) => {
            if (statusObj.status !== 'granted') {
                return Permissions.askAsync(Permissions.NOTIFICATIONS);
            }
            return statusObj;
        })
        .then((statusObj) => {
            if (statusObj.status !== 'granted') {
                throw new Error('Permission not granted');
            }
        })
        .then(() => {
            //talks to expo server and signs up for push tokens
            return Notifications.getExpoPushTokenAsync();
        })
        .then((response) => {
            console.log('response.data', response.data);
            const token = response.data;
            savePushToken(accesskey, userId, token);
            return token;
        })
        .catch((err) => {
            console.log('catching error in check permissions');
            throw err;
            // return null;
        });
};

function savePushToken(accesskey, userId, token) {
    return axios.patch(
        secretIp + `/api/users/expoPushToken/${userId}`,
        {
            pushToken: token,
        },
        {
            headers: {
                authorization: accesskey,
            },
        },
    );
}
