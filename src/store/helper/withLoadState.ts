export interface LoadableDataModel<T> {
    loading: boolean;
    loaded: boolean;
    error: any;
    data: T;
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

export const noopReducer = (state) => state;

export const withLoadState = (actionType) => {
    const actionReducerMap = {
        [actionType.loadingActionType]: onLoad,
        [actionType.loadedActionType]: onLoaded,
        [actionType.loadErrorActionType]: onLoadError,
        [actionType.savingActionType]: onSave,
        [actionType.savedActionType]: onSaveSuccess,
        [actionType.saveErrorActionType]: onSaveError,
    };

    return (baseReducer) => (state, action) => {
        const reducerFunction = actionReducerMap[action.type] || noopReducer;

        const newState = reducerFunction(state, action);
        return baseReducer(newState, action);
    };
};
