import { CREATE_CALENDAR, EXTEND_CALENDAR } from '../actions';
import {
    createDateArray,
    extendDateArray,
    getXMonths,
} from '../../services/Calendar/helper_functions/calendar_services';

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
