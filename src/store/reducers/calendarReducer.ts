import { EXTEND_CALENDAR, CalendarActionTypes, REFRESHING, REFRESHED } from '../actions';
import {
    withLoadState,
    FormStateModel,
    createDefaultFormState,
} from '../helper/withLoadState';
import { CalendarData } from '../../shared/models';
import { extendDateArray } from '../../services/Calendar/helper_functions';

const baseReducer = (
    state: FormStateModel<CalendarData> = createDefaultFormState(),
    action,
) => {
    switch (action.type) {
        case CalendarActionTypes.LOADED:
            return {
                ...state,
                data: action.payload,
            };
        case EXTEND_CALENDAR:
            const extendedDateArray = extendDateArray(action.payload, state.data);
            return {
                ...state,
                data: {
                    ...state.data,
                    dateArray: extendedDateArray,
                    isRefreshing: false,
                },
            };
        case REFRESHING:
            return {
                ...state,
                data: { ...state.data, isRefreshing: true },
            };
        default:
            return state;
    }
};

export const calendarReducer = withLoadState({
    loadingActionType: CalendarActionTypes.LOADING,
    loadedActionType: CalendarActionTypes.LOADED,
    loadErrorActionType: CalendarActionTypes.LOAD_ERROR,
    savingActionType: CalendarActionTypes.SAVING,
    savedActionType: CalendarActionTypes.SAVED,
    saveErrorActionType: CalendarActionTypes.SAVE_ERROR,
})(baseReducer);
