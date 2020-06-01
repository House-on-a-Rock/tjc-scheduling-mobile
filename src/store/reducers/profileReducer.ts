import { ProfileActionTypes } from '../actions';
import {
    FormStateModel,
    createDefaultFormState,
    withLoadState,
} from '../helper/withLoadState';
import { ProfileData } from '../../shared/models';

const baseReducer = (
    state: FormStateModel<ProfileData> = createDefaultFormState(),
    action,
) => {
    switch (action.type) {
        case ProfileActionTypes.LOADED:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export const profileReducer = withLoadState({
    loadingActionType: ProfileActionTypes.LOADING,
    loadedActionType: ProfileActionTypes.LOADED,
    loadErrorActionType: ProfileActionTypes.LOAD_ERROR,
    savingActionType: ProfileActionTypes.SAVING,
    savedActionType: ProfileActionTypes.SAVED,
    saveErrorActionType: ProfileActionTypes.SAVE_ERROR,
})(baseReducer);
