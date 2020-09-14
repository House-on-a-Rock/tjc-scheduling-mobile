import {
    SELECT_SWAP_DATE,
    SELECT_SWAP_OPTION,
    SELECT_TARGET_TASK,
    SEND_SWAP_REQUEST,
    RESET_SWAP_CONFIG,
    SET_SWAP_CANDIDATES,
    SET_MY_TASK,
} from '../actions';

const initialState = {
    option: 0,
    date: null,
    myTask: null,
    targetTask: null,
    candidates: null,
};

export const swapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SWAP_OPTION:
            return {
                ...state,
                option: action.payload,
            };
        case SELECT_TARGET_TASK: {
            return {
                ...state,
                targetTask: action.payload,
            };
        }
        case SELECT_SWAP_DATE: {
            return {
                ...state,
                date: action.payload,
            };
        }
        case SET_MY_TASK: {
            return {
                ...state,
                myTask: action.payload,
            };
        }
        case SET_SWAP_CANDIDATES: {
            return {
                ...state,
                candidates: action.payload,
            };
        }
        case RESET_SWAP_CONFIG: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};
