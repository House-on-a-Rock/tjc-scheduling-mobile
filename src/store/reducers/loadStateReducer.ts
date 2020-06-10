import { reducerDomains, loadStateActionTypes } from '../actions';

const initialState = {
    loadState: loadStateActionTypes.LOADED,
    loadStatus: {
        [reducerDomains.AUTH]: loadStateActionTypes.LOADED,
        [reducerDomains.PROFILE]: loadStateActionTypes.LOADED,
        [reducerDomains.TASKS]: loadStateActionTypes.LOADED,
        [reducerDomains.CALENDAR]: loadStateActionTypes.LOADED,
    },
    loadErrorStatus: {},
};

export const loadStateReducer = (state = initialState, action) => {
    const updatedState = mapActionToDomain(action.domain);
    const newLoadState = determineLoadState(updatedState);

    updatedState.loadState = newLoadState;

    return updatedState;

    //use of domains (such as AUTH or TASKS) cuts down on repetitive code
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
            default:
                return state;
        }
    }

    //distills entire loadstate down to one property that the front end will handle accordingly
    function determineLoadState(updatedState) {
        const values = Object.values(updatedState.loadStatus);
        if (values.indexOf(loadStateActionTypes.ERROR) >= 0)
            return loadStateActionTypes.ERROR;
        else if (values.indexOf(loadStateActionTypes.LOADING) >= 0)
            return loadStateActionTypes.LOADING;
        else return loadStateActionTypes.LOADED;
    }
};
