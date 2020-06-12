import { reducerDomains, loadStateActionTypes } from '../actions';

const initialState = {
    // loadState: loadStateActionTypes.LOADED,
    loadStatus: {
        [reducerDomains.AUTH]: null,
        [reducerDomains.PROFILE]: null,
        [reducerDomains.TASKS]: null,
        [reducerDomains.CALENDAR]: null,
    },
    loadErrorStatus: {
        [reducerDomains.AUTH]: null,
        [reducerDomains.PROFILE]: null,
        [reducerDomains.TASKS]: null,
        [reducerDomains.CALENDAR]: null,
    },
};

export const loadStateReducer = (state = initialState, action) => {
    const updatedState = mapActionToDomain(action.domain);
    // const newLoadState = determineLoadState(updatedState);
    // updatedState.loadState = newLoadState;
    console.log('action', action);
    return updatedState;

    //use of domains (such as AUTH or TASKS) cuts down on repetition of switch cases
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
                    //
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: action.error,
                    },
                };
            case loadStateActionTypes.ERROR_HANDLED:
                return {
                    ...state,
                    loadStatus: {
                        ...state.loadStatus,
                        [domain]: loadStateActionTypes.ERROR,
                    },
                    //
                    loadErrorStatus: {
                        ...state.loadErrorStatus,
                        [domain]: null,
                    },
                };
            default:
                return state;
        }
    }

    //distills entire loadstate down to one property that the front end will handle accordingly
    //moved to helper functions
    // function determineLoadState(updatedState) {
    //     const values = Object.values(updatedState.loadStatus);
    //     if (values.indexOf(loadStateActionTypes.ERROR) >= 0)
    //         return loadStateActionTypes.ERROR;
    //     else if (values.indexOf(loadStateActionTypes.LOADING) >= 0)
    //         return loadStateActionTypes.LOADING;
    //     else return loadStateActionTypes.LOADED;
    // }
};
