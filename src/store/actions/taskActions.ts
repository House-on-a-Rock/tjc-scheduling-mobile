import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { TaskStateActions } from '../actions/loadStateActions';
import { login } from './authActions';

export const SET_TASKS = 'SET_TASKS';

export const setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        payload: tasks,
    };
};

export const fetchTasksOnLogin = () => {
    return async (dispatch) => {
        let accesskey = await AsyncStorage.getItem('access_token');
        const userId = extractId(accesskey);
        dispatch(TaskStateActions.Loading());
        await axios
            .get(secretIp + '/api/tasks/getAllUserTasks', {
                params: { id: userId },
                headers: {
                    authorization: accesskey,
                },
            })
            .then((response) => {
                let tasks = response.data;
                dispatch(setTasks(tasks));
                dispatch(TaskStateActions.Loaded());
                // dispatch(login())
            })
            .catch((error) => {
                dispatch(TaskStateActions.Error(error));
                console.log('error fetching tasks', error);
            });
    };
};
