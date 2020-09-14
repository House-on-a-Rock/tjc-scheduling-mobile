//will need in future?
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';

import { SwapStateActions } from '../actions/loadStateActions';
import { errorDataExtractor, ErrorData } from '../helper';
import { timeoutPromise } from '../../services/API/api_helper_functions';

export const SELECT_SWAP_OPTION = 'SELECT_SWAP_OPTION';
export const SELECT_SWAP_DATE = 'SELECT_SWAP_DATE';
export const SELECT_TARGET_TASK = 'SELECT_TARGET_TASK';
export const SET_MY_TASK = 'SET_MY_TASK';
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

export const setMyTask = (task) => {
    return {
        type: SET_MY_TASK,
        payload: task,
    };
};

export const selectTargetTask = (task) => {
    return {
        type: SELECT_TARGET_TASK,
        payload: task,
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

function createSwapRequest(myTask, targetTask, message) {
    return axios.post(secretIp + '/api/swap-requests', {
        myTaskId: myTask,
        targetTaskId: targetTask,
        message: message,
    });
}

function retrieveCandidates(churchId, roleId) {
    return axios.get(secretIp + `/api/users?churchId=${churchId}&roleId=${roleId}`, {});
}

async function getUserTasks(userId, roleId) {
    return axios.get(secretIp + `/api/tasks?userId=${userId}&roleId=${roleId}`, {
        params: { userId: userId },
    });
}

export const sendSwapRequest = (myTask, targetTask, message) => {
    return async (dispatch) => {
        dispatch(SwapStateActions.Loading());

        try {
            const response = await Promise.race([
                createSwapRequest(myTask, targetTask, message),
                timeoutPromise(),
            ]);
            dispatch(SwapStateActions.Loaded());
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            return dispatch(SwapStateActions.Error(errorData));
        }
    };
};

export const retrieveSwapCandidates = (churchId, roleId, userId) => {
    return async (dispatch) => {
        try {
            const response = await Promise.race([
                retrieveCandidates(churchId, roleId),
                timeoutPromise(),
            ]);
            let candidates = response.data;

            const completeCandidateData = await Promise.all(
                candidates.map(async (candidate) => {
                    const userTasks = await getUserTasks(candidate.userId, roleId);
                    candidate.tasks = userTasks.data;
                    return candidate;
                }),
            );
            dispatch(setSwapCandidates(completeCandidateData));
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            console.log('error in there', error);
            return dispatch(SwapStateActions.Error(errorData));
        }
    };
};
