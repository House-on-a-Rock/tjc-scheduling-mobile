import {
    SELECT_SWAP_DATE,
    SELECT_SWAP_OPTION,
    SELECT_SWAP_TARGET,
    SEND_SWAP_REQUEST,
    RESET_SWAP_CONFIG,
} from '../actions';

const initialState = {
    swapOption: 0,
    swapDate: null,
    swapTarget: null,
};

export const swapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SWAP_OPTION:
            return {
                ...state,
                swapOption: action.payload,
            };
        case SELECT_SWAP_TARGET: {
            return {
                ...state,
                swapTarget: action.payload,
            };
        }
        case SELECT_SWAP_DATE:
            return {
                ...state,
                swapDate: action.payload,
            };
        case RESET_SWAP_CONFIG: {
            // console.log('returning to initial state');
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};
