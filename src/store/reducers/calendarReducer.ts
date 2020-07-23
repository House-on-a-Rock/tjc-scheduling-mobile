import {
    CREATE_CALENDAR,
    EXTEND_CALENDAR,
    SHOW_PREVIEW_PANE,
    HIDE_PREVIEW_PANE,
    REFRESHING,
    REFRESHED,
    LOGOUT,
    SELECT_DATE,
} from '../actions';
import { extendDateArray } from '../../services/Calendar/helper_functions/calendar_services';

const initialState = {
    dateArray: [],
    today: null,
    isRefreshing: false,
    selectedDate: null,
    previewPaneVisible: false,
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR:
            return action.payload;
        case SHOW_PREVIEW_PANE:
            return {
                ...state,
                previewPaneVisible: true,
            };
        case HIDE_PREVIEW_PANE:
            return {
                ...state,
                previewPaneVisible: false,
            };
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
        case SELECT_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
