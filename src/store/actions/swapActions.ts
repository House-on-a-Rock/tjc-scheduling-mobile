//will need in future
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { TaskStateActions } from '../actions/loadStateActions';
import { errorDataExtractor } from '../helper';

export const SELECT_SWAP_DATE = 'SELECT_SWAP_DATE';

export const selectSwapDate = (date: Date) => {
    return {
        type: SELECT_SWAP_DATE,
        payload: date,
    };
};

export const sendSwapRequest = () => {
    return async (dispatch) => {
        //send swap request
    };
};
