import { CREATE_CALENDAR, EXTEND_CALENDAR } from '../actions';
import {
    createDateArray,
    extendDateArray,
    getXMonths,
} from '../../services/Calendar/helper_functions/calendar_services';

const initialState = {
    dateArray: [],
    today: new Date(),
    currentlyDisplayedMonth: new Date().getMonth(),
    renderedMonthRange: [getXMonths(new Date(), -3)[0], getXMonths(new Date(), 3)[2]],
    currentlyRenderingMonthYear: getXMonths(new Date(), -3)[0], //initializes rendering with first day of the desired range
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
