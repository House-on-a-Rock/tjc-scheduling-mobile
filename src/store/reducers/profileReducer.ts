import { SET_PROFILE, LOGOUT } from '../actions';

const initialState = {
    profile: null,
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
