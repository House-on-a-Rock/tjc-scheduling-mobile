import { createDateArray } from '../../services/Calendar/helper_functions';
import { CalendarData } from '../../shared/models';
import { CalendarStateActions } from './loadStateActions';

export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';

export const extendCalendar = (direction) => {
    return {
        type: EXTEND_CALENDAR,
        payload: direction,
    };
};

// Thunky thunk

export const createCalendar = () => {
    return {
        type: CREATE_CALENDAR,
    };
};
