export interface LoadableDataModel<T> {
    loading: boolean;
    loaded: boolean;
    error: any;
    data: T;
}

export enum LoadingActionTypes {
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    SAVING = 'SAVING',
    SAVED = 'SAVED',
    LOAD_ERROR = 'ERROR',
    SAVE_ERROR = 'SAVE_ERROR',
}
export interface FormStateModel<T> extends LoadableDataModel<T> {
    saving: boolean;
    saved: boolean;
    validationErrors: any;
    // BackendValidationErrorModel[];
}

export function createDefaultFormState(): FormStateModel<any> {
    return {
        loading: false,
        loaded: false,
        saving: false,
        saved: false,
        validationErrors: null,
        data: null,
        error: null,
    };
}

// interface FormActionTypesInterfaceModel {
//     loadingActionType?: string | string[];
//     loadedActionType?: string;
//     loadingErrorActionType?: string;
//     savingActionType?: string;
//     savedActionType?: string;
//     loadErrorActionType?: string;
//     saveErrorActionType?: string;
// }

function onLoad(fromState) {
    return {
        ...fromState,
        loading: true,
        loaded: false,
        saved: false,
        validationErrors: null,
        data: null,
        error: null,
    };
}

function onLoaded(fromState) {
    return {
        ...fromState,
        loading: false,
        loaded: true,
    };
}

function onLoadError(fromState, error) {
    return {
        ...fromState,
        loading: false,
        saving: false,
        error: error,
    };
}

function onSave(fromState) {
    return {
        ...fromState,
        loaded: false,
        saving: true,
        validationErrors: null,
        error: null,
    };
}

function onSaveSuccess(fromState) {
    return {
        ...fromState,
        saving: false,
        saved: true,
    };
}

function onSaveError(fromState, error) {
    return {
        ...fromState,
        saving: false,
        error: error,
    };
}

export const withLoadState = (baseReducer, actionType) => {
    return (state, action) => {
        switch (action.type) {
            case actionType.loadingActionType:
                state = onLoad(state);

            case actionType.loadedActionType:
                state = onLoaded(state);
                break;

            case actionType.loadErrorActionType:
                state = onLoadError(state, action.payload.error);
                break;

            case actionType.savingActionType:
                state = onSave(state);
                break;

            case actionType.savedActionType:
                state = onSaveSuccess(state);
                break;

            case actionType.saveErrorActionType:
                state = onSaveError(state, action.payload.error);
                break;
        }
        return baseReducer(state, action);
    };
};
