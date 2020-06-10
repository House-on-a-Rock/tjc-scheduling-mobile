import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { TaskData } from '../../shared/models';
import { login } from './authentication';

export const loadingTasks = () => {
    return {
        type: 'Task Loading',
    };
};

export const loadTasksSuccess = (tasks: TaskData[]) => {
    return {
        type: 'Task Loaded',
        payload: tasks,
    };
};

export const TaskActionTypes = {
    LOADING: 'Task Loading',
    LOADED: 'Task Loaded',
    SAVING: 'Task Saving',
    SAVED: 'Task Saved',
    LOAD_ERROR: 'Task Load Error',
    SAVE_ERROR: 'Task Save Error',
};

export const fetchTasksOnLogin = (userId) => {
    return async (dispatch) => {
        dispatch(loadingTasks());
        const accesskey = await AsyncStorage.getItem('access_token');
        await axios
            .get(secretIp + '/api/tasks/getAllUserTasks', {
                params: { id: userId },
                headers: {
                    authorization: accesskey,
                },
            })
            .then((response) => {
                let tasks = response.data;
                dispatch(loadTasksSuccess(tasks));
                dispatch(login());
            })
            .catch((error) => {
                // dispatch(authError())
                console.log(error);
            });
    };
};
