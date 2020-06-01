import { EXTEND_CALENDAR, CalendarActionTypes } from '../actions';
import {
    withLoadState,
    FormStateModel,
    createDefaultFormState,
} from '../helper/withLoadState';
import { CalendarData } from '../../shared/models';

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
            return {
                //extends datearray as well as make api call to populate data
                ...state,
                // renderedMonthRange needs to update as well
                // dateArray: extendDateArray(action.payload, state.data.dateArray),
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
