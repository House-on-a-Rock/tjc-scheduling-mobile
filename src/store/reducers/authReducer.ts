import { LOGIN, LOGOUT, AUTH_ERROR } from '../actions';

const initialState = {
    isLoggedIn: false,
    isValidLogin: true,
};

export const authReducer = (state = initialState, action) => {
    // console.log('reducer', action);
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
        case AUTH_ERROR: {
            console.log('auth error reducer running');
            return {
                ...state,
                isValidLogin: false,
            };
        }
        default:
            return state;
    }
};
