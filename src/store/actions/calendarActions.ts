import { createDateArray } from '../../services/Calendar/helper_functions';

import { CalendarData } from '../../shared/models';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';

export const loadingCalendar = () => {
    console.log('creatingCalendar');
    return {
        type: CalendarActionTypes.LOADING,
    };
};

export const loadedCalendarSuccess = (data) => {
    console.log('loadedCalendarSuccess', data);
    return {
        type: CalendarActionTypes.LOADED,
        payload: data,
    };
};

export const extendCalendar = (direction) => {
    return {
        type: EXTEND_CALENDAR,
        payload: direction,
    };
};

export const CalendarActionTypes = {
    LOADING: 'Calendar Loading',
    LOADED: 'Calendar Loaded',
    SAVING: 'Calendar Saving',
    SAVED: 'Calendar Saved',
    LOAD_ERROR: 'Calendar Load Error',
    SAVE_ERROR: 'Calendar Save Error',
};

// Thunky thunk

export const createCalendar = () => {
    const today: Date = new Date();
    const initialCalendarData: CalendarData = {
        dateArray: [],
        today: today,
        renderedMonthRange: [
            new Date(today.getFullYear(), today.getMonth() - 12, 1),
            new Date(today.getFullYear(), today.getMonth() + 12, 1),
        ],
    };
    return (dispatch) => {
        dispatch(loadingCalendar());
        const dateSpread = createDateArray(
            initialCalendarData.renderedMonthRange[0],
            initialCalendarData.renderedMonthRange[1],
        );
        initialCalendarData.dateArray = dateSpread;
        dispatch(loadedCalendarSuccess(initialCalendarData));
    };
};
