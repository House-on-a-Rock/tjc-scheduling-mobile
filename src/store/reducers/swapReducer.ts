import { SELECT_SWAP_DATE } from '../actions';

const initialState = {
    swapDate: null,
};

export const swapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_SWAP_DATE:
            return {
                ...state,
                swapDate: action.payload,
            };
        default:
            return state;
    }
};
