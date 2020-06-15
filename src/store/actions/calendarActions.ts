import { createDateArray } from '../../services/Calendar/helper_functions';
import { CalendarData } from '../../shared/models';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';
export const REFRESHING = 'REFRESHING';
export const REFRESHED = 'REFRESHED';

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
    };
    const today: Date = new Date();
    const defaultDateArray = createDateArray(
        new Date(today.getFullYear(), today.getMonth() - 12, 1),
        new Date(today.getFullYear(), today.getMonth() + 12, 1),
    );
    calendar.today = today;
    calendar.dateArray = defaultDateArray;
    return calendar;
}
