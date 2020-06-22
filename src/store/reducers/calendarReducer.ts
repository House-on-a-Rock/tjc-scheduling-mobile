import {
    CREATE_CALENDAR,
    EXTEND_CALENDAR,
    REFRESHING,
    REFRESHED,
    LOGOUT,
} from '../actions';
import { extendDateArray } from '../../services/Calendar/helper_functions/calendar_services';

const initialState = {
    dateArray: [],
    today: null,
    isRefreshing: false,
};

export const calendarReducer = (state = initialState, action) => {
    console.log('action', action);
    switch (action.type) {
        case CREATE_CALENDAR:
            return action.payload;

        case EXTEND_CALENDAR:
            const extendedDateArray = extendDateArray(action.payload, state);
            return {
                ...state,
                dateArray: extendedDateArray,
                isRefreshing: false,
            };
        case REFRESHING:
            return {
                ...state,
                isRefreshing: true,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
