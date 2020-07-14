import { createDateArray } from '../../services/Calendar/helper_functions';
import { CalendarData } from '../../shared/models';
import { calendarRange } from '../../shared/constants/calendarConstants';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';
export const REFRESHING = 'REFRESHING';
export const SHOW_PREVIEW_PANE = 'SHOW_PREVIEW_PANE';
export const HIDE_PREVIEW_PANE = 'HIDE_PREVIEW_PANE';
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

export const showPreviewPane = () => {
    return {
        type: SHOW_PREVIEW_PANE,
    };
};

export const hidePreviewPane = () => {
    return {
        type: HIDE_PREVIEW_PANE,
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

export const selectDate = (date: Date, tasks) => {
    if (!date || !tasks) return { type: SELECT_DATE, payload: null };
    return {
        type: SELECT_DATE,
        payload: { date: date, tasks: tasks },
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
    const defaultDateArray = createDateArray(
        new Date(today.getFullYear(), today.getMonth() - calendarRange, 1),
        new Date(today.getFullYear(), today.getMonth() + calendarRange, 1),
    );
    calendar.today = today;
    calendar.dateArray = defaultDateArray;
    calendar.selectedDate = null;
    return calendar;
}
