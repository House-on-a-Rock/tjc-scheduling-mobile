import { LOGIN, LOGOUT } from '../actions';

const initialState = {
    isLoggedIn: false,
    isValidLogin: true,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                isValidLogin: true,
            };
        case LOGOUT: {
            return {
                initialState,
            };
        }
        default:
            return state;
    }
};
