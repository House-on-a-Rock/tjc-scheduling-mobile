import { TaskStateActions, SET_TASKS } from '../actions';

const initialState = {
    tasks: [],
};

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };
        default:
            return state;
    }
};
