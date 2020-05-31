import { TaskActionTypes } from '../actions';
import {
    FormStateModel,
    createDefaultFormState,
    withLoadState,
} from '../helper/withLoadState';
import { TaskData } from '../../shared/models';

const baseReducer = (
    state: FormStateModel<TaskData> = createDefaultFormState(),
    action,
) => {
    switch (action.type) {
        case TaskActionTypes.LOADED:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export const taskReducer = withLoadState({
    loadingActionType: TaskActionTypes.LOADING,
    loadedActionType: TaskActionTypes.LOADED,
    loadErrorActionType: TaskActionTypes.LOAD_ERROR,
    savingActionType: TaskActionTypes.SAVING,
    savedActionType: TaskActionTypes.SAVED,
    saveErrorActionType: TaskActionTypes.SAVE_ERROR,
})(baseReducer);
