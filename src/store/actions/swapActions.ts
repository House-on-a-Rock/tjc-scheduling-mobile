//will need in future?
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { SwapStateActions } from '../actions/loadStateActions';
import { errorDataExtractor } from '../helper';

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

function swapRequest() {
    // axios
}

export const sendSwapRequest = (swapOption, swapDate, swapTarget) => {
    console.log('calling sendSwapRequest');
    // return async (dispatch) => {
    //     dispatch(SwapStateActions.Loading())

    //     send swap request
    //     handle loading screen
    // };
};
