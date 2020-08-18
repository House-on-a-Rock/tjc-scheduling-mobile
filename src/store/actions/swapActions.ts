//will need in future?
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';

import { SwapStateActions } from '../actions/loadStateActions';
import { errorDataExtractor, ErrorData } from '../helper';
import { timeoutPromise } from '../../services/API/api_helper_functions';

export const SELECT_SWAP_OPTION = 'SELECT_SWAP_OPTION';
export const SELECT_SWAP_DATE = 'SELECT_SWAP_DATE';
export const SELECT_SWAP_TARGET = 'SELECT_SWAP_TARGET';
export const SEND_SWAP_REQUEST = 'SEND_SWAP_REQUEST';
export const RESET_SWAP_CONFIG = 'RESET_SWAP_CONFIG';
export const SET_SWAP_CANDIDATES = 'SET_SWAP_CANDIDATES';

export const selectSwapOption = (option: number) => {
    return {
        type: SELECT_SWAP_OPTION,
        payload: option,
    };
};

export const selectSwapDate = (date) => {
    return {
        type: SELECT_SWAP_DATE,
        payload: date,
    };
};

export const selectSwapTarget = (targetId: number) => {
    return {
        type: SELECT_SWAP_TARGET,
        payload: targetId,
    };
};

export const resetSwapConfig = () => {
    return {
        type: RESET_SWAP_CONFIG,
    };
};

export const setSwapCandidates = (swapCandidates) => {
    return {
        type: SET_SWAP_CANDIDATES,
        payload: swapCandidates,
    };
};

function createSwapRequest(option, date, target, accesskey) {
    return axios.post(
        secretIp + '/api/swap-requests',
        {
            taskId: 5,
            switchWithId: 3,
        },
        {
            headers: {
                authorization: accesskey,
            },
        },
    );
}

function retrieveUsers(churchId, roleId) {
    return axios.get(secretIp + `/api/users?churchId=${churchId}&roleId=${roleId}`, {
        // headers: {
        //     authorization: accesskey,
        // },
    });
}

function getUserTasks(userId, roleId) {
    return axios.get(secretIp + `/api/tasks?userId=${userId}&roleId=${roleId}`, {
        params: { userId: userId },
    });
}

export const sendSwapRequest = (option, date, target) => {
    return async (dispatch) => {
        dispatch(SwapStateActions.Loading());
        let accesskey = await AsyncStorage.getItem('access_token');
        try {
            const response = await Promise.race([
                createSwapRequest(option, date, target, accesskey),
                timeoutPromise(),
            ]);
            dispatch(SwapStateActions.Loaded());
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            return dispatch(SwapStateActions.Error(errorData));
        }
    };
};

export const retrieveSwapCandidates = (churchId, roleId) => {
    console.log('in retrieve swap candidates', churchId, roleId);
    return async (dispatch) => {
        // dispatch(SwapStateActions.Loading());
        try {
            const response = await Promise.race([
                // retrieveUsers(churchId, roleId),
                retrieveUsers(1, 1),
                timeoutPromise(),
            ]);
            console.log('response', response.data);
            let candidates = response.data;
            candidates.map(async (candidate) => {
                // const userTasks = await getUserTasks(candidate.userId, roleId);
                const userTasks = await getUserTasks(2, 2);

                console.log('userTasks', userTasks.data);
                candidate.tasks = userTasks.data;
            });
            console.log('candidates', candidates);
            dispatch(setSwapCandidates(response.data));
            // dispatch(SwapStateActions.Loaded());
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            console.log('error in there', error);
            return dispatch(SwapStateActions.Error(errorData));
        }
    };
};
