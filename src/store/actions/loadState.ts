export const CHANGE_LOAD_STATE = 'CHANGE_LOAD_STATE';

export const states = {
    loaded: 'loaded',
    loading: 'loading',
    saving: 'saving',
    saved: 'saved',
};

export const changeLoadState = (loadState) => {
    return {
        type: CHANGE_LOAD_STATE,
        payload: loadState,
    };
};
