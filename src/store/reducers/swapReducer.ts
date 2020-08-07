import {
    SELECT_SWAP_DATE,
    SELECT_SWAP_OPTION,
    SELECT_SWAP_TARGET,
    SEND_SWAP_REQUEST,
    RESET_SWAP_CONFIG,
} from '../actions';

const initialState = {
    option: 0,
    date: null,
    target: null,
};

export const swapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SWAP_OPTION:
            return {
                ...state,
                option: action.payload,
            };
        case SELECT_SWAP_TARGET: {
            return {
                ...state,
                target: action.payload,
            };
        }
        case SELECT_SWAP_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case RESET_SWAP_CONFIG: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};
