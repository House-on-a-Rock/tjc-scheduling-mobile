export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';
export const UPDATE_CURRENTLY_RENDERING_DATE = 'UPDATE_CURRENTLY_RENDERING_DATE';

export const createCalendar = () => {
    return {
        type: CREATE_CALENDAR,
    };
};

export const updateCurrentlyRenderingDate = () => {
    return {
        type: UPDATE_CURRENTLY_RENDERING_DATE,
    };
};

export const extendCalendar = (direction) => {
    return {
        type: EXTEND_CALENDAR,
        payload: direction,
    };
};
