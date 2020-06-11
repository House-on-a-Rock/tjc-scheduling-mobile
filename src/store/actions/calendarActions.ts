import { createDateArray } from '../../services/Calendar/helper_functions';
import { CalendarData } from '../../shared/models';
import { CarousalDirection } from '../../services/Calendar/models';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';
export const REFRESHING = 'REFRESHING';
export const REFRESHED = 'REFRESHED';

export const refreshingCalendar = () => {
    return {
        type: REFRESHING,
    };
};

export const calendarRefreshed = () => {
    return {
        type: REFRESHED,
    };
};

export const loadingCalendar = () => {
    return {
        type: CalendarActionTypes.LOADING,
    };
};

export const loadedCalendarSuccess = (data) => {
    return {
        type: CalendarActionTypes.LOADED,
        payload: data,
    };
};

export const extendingCalendar = (direction) => {
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
        isRefreshing: false,
    };
    return (dispatch) => {
        dispatch(loadingCalendar());
        const dateSpread = createDateArray(
            new Date(today.getFullYear(), today.getMonth() - 12, 1),
            new Date(today.getFullYear(), today.getMonth() + 12, 1),
        );
        initialCalendarData.dateArray = dateSpread;
        dispatch(loadedCalendarSuccess(initialCalendarData));
    };
};

export const extendCalendar = (direction) => {
    return (dispatch) => {
        dispatch(refreshingCalendar());
        dispatch(extendingCalendar({ direction: direction, range: 12 }));
    };
};
