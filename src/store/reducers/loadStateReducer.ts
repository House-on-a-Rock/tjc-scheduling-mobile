import { reducerDomains, loadStateActionTypes, LOGOUT } from '../actions';

const initialState = {
    loadStatus: {
        [reducerDomains.AUTH]: null,
        [reducerDomains.PROFILE]: null,
        [reducerDomains.TASKS]: null,
        [reducerDomains.SWAP]: null,
    },
    loadErrorStatus: {
        [reducerDomains.AUTH]: null,
        [reducerDomains.PROFILE]: null,
        [reducerDomains.TASKS]: null,
        [reducerDomains.SWAP]: null,
    },
};

export const loadStateReducer = (state = initialState, action) => {
    //resets to initial state on logout
    if (action.type === LOGOUT) return initialState;

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
                    loadErrorStatus: {
                        ...state.loadStatus,
                        [domain]: null,
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
                        [domain]: action.payload,
                    },
                };
            // case loadStateActionTypes.ERROR_HANDLED:
            //     return {
            //         ...state,
            //         loadStatus: {
            //             ...state.loadStatus,
            //             [domain]: null,
            //         },
            //         loadErrorStatus: {
            //             ...state.loadErrorStatus,
            //             [domain]: null,
            //         },
            //     };
            default:
                return state;
        }
    }
};
