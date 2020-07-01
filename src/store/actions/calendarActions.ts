import { createDateArray } from '../../services/Calendar/helper_functions';
import { CalendarData } from '../../shared/models';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';
export const REFRESHING = 'REFRESHING';
export const REFRESHED = 'REFRESHED';
export const SELECT_DATE = 'SELECT_DATE';

export const createCalendar = () => {
    return {
        type: CREATE_CALENDAR,
        payload: initialCalendarData(),
    };
};

export const extendingCalendar = (direction) => {
    return {
        type: EXTEND_CALENDAR,
        payload: direction,
    };
};

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

export const selectDate = (date: Date) => {
    return {
        type: SELECT_DATE,
        payload: date,
    };
};

// Thunky thunk

export const extendCalendar = (direction) => {
    return (dispatch) => {
        dispatch(refreshingCalendar());
        dispatch(extendingCalendar({ direction: direction, range: 12 }));
    };
};

function initialCalendarData() {
    let calendar: CalendarData = {
        dateArray: [],
        today: null,
        isRefreshing: false,
        selectedDate: null,
    };
    const today: Date = new Date();
    const selectedDate = today;
    const defaultDateArray = createDateArray(
        new Date(today.getFullYear(), today.getMonth() - 6, 1),
        new Date(today.getFullYear(), today.getMonth() + 6, 1),
    );
    calendar.today = today;
    calendar.dateArray = defaultDateArray;
    calendar.selectedDate = selectedDate;
    return calendar;
}
