import { reducerDomains, loadStateActionTypes } from '../actions';

const initialState = {
    loadStatus: {
        [reducerDomains.AUTH]: null,
        [reducerDomains.PROFILE]: null,
        [reducerDomains.TASKS]: null,
    },
    loadErrorStatus: {},
};

export const loadStateReducer = (state = initialState, action) => {
    return mapActionToDomain(action.domain);

    function mapActionToDomain(domain) {
        switch (action.type) {
            case loadStateActionTypes.LOADED:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: loadStateActionTypes.LOADED,
                    },
                };
            case loadStateActionTypes.LOADING:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: loadStateActionTypes.LOADING,
                    },
                };
            case loadStateActionTypes.ERROR:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: loadStateActionTypes.ERROR,
                    },
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: action.error,
                    },
                };
            default:
                return state;
        }
    }
};
