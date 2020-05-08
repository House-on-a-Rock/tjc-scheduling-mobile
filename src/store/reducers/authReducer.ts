import { LOGIN } from '../actions';

const initialState = {
    isLoggedIn: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};
