import { CREATE_CALENDAR, EXTEND_CALENDAR } from '../actions';
import {
    createDateArray,
    extendDateArray,
} from '../../services/Calendar/helper_functions/calendar_services';

//may need to be cleaned up
const today: Date = new Date();
const rangeStart = new Date(today.getFullYear(), today.getMonth() - 12, 1);
const rangeEnd = new Date(today.getFullYear(), today.getMonth() + 12, 1);

const initialState = {
    dateArray: [],
    today: today,
    renderedMonthRange: [rangeStart, rangeEnd],
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR:
            return {
                ...state,
                dateArray: createDateArray(
                    state.renderedMonthRange[0],
                    state.renderedMonthRange[1],
                ),
            };
        case EXTEND_CALENDAR:
            return {
                //extends datearray as well as make api call to populate data
                ...state,
                dateArray: extendDateArray(action.payload, state.dateArray),
            };
        default:
            return state;
    }
};

// export const calendarReducer = withLoadState({
//     loadingActionType: CalendarActionTypes.LOADING,
//     loadedActionType: CalendarActionTypes.LOADED,
//     loadErrorActionType: CalendarActionTypes.LOAD_ERROR,
//     savingActionType: CalendarActionTypes.SAVING,
//     savedActionType: CalendarActionTypes.SAVED,
//     saveErrorActionType: CalendarActionTypes.SAVE_ERROR,
// })(baseReducer);
