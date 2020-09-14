import { ReducerDomains, LoadStateActionTypes, LOGOUT } from '../actions';

const initialState = {
    loadStatus: {
        [ReducerDomains.AUTH]: null,
        [ReducerDomains.PROFILE]: null,
        [ReducerDomains.TASKS]: null,
        [ReducerDomains.SWAP]: null,
    },
    loadErrorStatus: {
        [ReducerDomains.AUTH]: null,
        [ReducerDomains.PROFILE]: null,
        [ReducerDomains.TASKS]: null,
        [ReducerDomains.SWAP]: null,
    },
};

export const loadStateReducer = (state = initialState, action) => {
    //resets to initial state on logout
    if (action.type === LOGOUT) return initialState;

    return mapActionToDomain(action.domain);

    function mapActionToDomain(domain) {
        switch (action.type) {
            case LoadStateActionTypes.LOADED:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadStateActionTypes.LOADED,
                    },
                };
            case LoadStateActionTypes.LOADING:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadStateActionTypes.LOADING,
                    },
                    loadErrorStatus: {
                        ...state.loadStatus,
                        [domain]: null,
                    },
                };
            case LoadStateActionTypes.ERROR:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: LoadStateActionTypes.ERROR,
                    },
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: action.payload,
                    },
                };
            case LoadStateActionTypes.DEFAULT_STATE:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: null,
                    },
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: null,
                    },
                };
            default:
                return state;
        }
    }
};
