import { ErrorData } from '../helper';

export enum reducerDomains {
    AUTH = 'AUTH',
    PROFILE = 'PROFILE',
    TASKS = 'TASKS',
    SWAP = 'SWAP',
}

export enum loadStateActionTypes {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    // ERROR_HANDLED = 'ERROR_HANDLED',
}

export const AuthStateActions: StateActions = mapLoadStateActions(reducerDomains.AUTH);
export const ProfileStateActions: StateActions = mapLoadStateActions(
    reducerDomains.PROFILE,
);
export const TaskStateActions: StateActions = mapLoadStateActions(reducerDomains.TASKS);
export const SwapStateActions: StateActions = mapLoadStateActions(reducerDomains.SWAP);

//this may be moved to a more appropriate location?
function mapLoadStateActions(domain): StateActions {
    return {
        Loaded: () => ({ domain: domain, type: loadStateActionTypes.LOADED }),
        Loading: () => ({ domain: domain, type: loadStateActionTypes.LOADING }),
        Error: (error) => ({
            domain: domain,
            type: loadStateActionTypes.ERROR,
            payload: error,
        }),
    };
}

interface StateActions {
    Loaded: () => { domain: reducerDomains; type: loadStateActionTypes };
    Loading: () => { domain: reducerDomains; type: loadStateActionTypes };
    Error: (
        error: ErrorData,
    ) => { domain: reducerDomains; type: loadStateActionTypes; payload: ErrorData };
}
