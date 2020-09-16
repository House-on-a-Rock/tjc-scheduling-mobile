import { SET_NOTIFICATIONS } from '../actions';
const initialState = {
    notifications: null,
};

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
            };
        default:
            return state;
    }
};
