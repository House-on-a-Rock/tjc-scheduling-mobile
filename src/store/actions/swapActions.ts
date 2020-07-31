//will need in future?
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { SwapStateActions } from '../actions/loadStateActions';
import { errorDataExtractor, ErrorData } from '../helper';
import { timeoutPromise } from '../../services/API/api_helper_functions';

export const SELECT_SWAP_OPTION = 'SELECT_SWAP_OPTION';
export const SELECT_SWAP_DATE = 'SELECT_SWAP_DATE';
export const SELECT_SWAP_TARGET = 'SELECT_SWAP_TARGET';
export const SEND_SWAP_REQUEST = 'SEND_SWAP_REQUEST';
export const RESET_SWAP_CONFIG = 'RESET_SWAP_CONFIG';

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

function createSwapRequest(swapOption, swapDate, swapTarget, accesskey) {
    return axios.post(
        secretIp + '/api/swap-request',
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

export const sendSwapRequest = (swapOption, swapDate, swapTarget) => {
    return async (dispatch) => {
        dispatch(SwapStateActions.Loading());
        let accesskey = await AsyncStorage.getItem('access_token');
        console.log('accesskey', accesskey);
        // setTimeout(() => dispatch(SwapStateActions.Loaded()), 2000);
        try {
            const response = await Promise.race([
                createSwapRequest(swapOption, swapDate, swapTarget, accesskey),
                timeoutPromise(),
            ]);
            dispatch(SwapStateActions.Loaded());
        } catch (error) {
            const errorData: ErrorData = errorDataExtractor(error);
            return dispatch(SwapStateActions.Error(errorData));
        }
    };
};
