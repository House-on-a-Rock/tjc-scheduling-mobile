import { CREATE_CALENDAR, EXTEND_CALENDAR } from '../actions';
import { createDateArray, extendDateArray } from '../../utils/calendarServices';
import { useSelector } from 'react-redux';

const initialState = {
    dateArray: [],
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CALENDAR:
            return {
                ...state,
                dateArray: createDateArray(),
                // useSelector((state) => state.profileReducer.profile),
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
