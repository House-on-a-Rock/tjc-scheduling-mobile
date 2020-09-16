import { ErrorData } from '../helper';

export enum ReducerDomains {
    AUTH = 'AUTH',
    PROFILE = 'PROFILE',
    TASKS = 'TASKS',
    SWAP = 'SWAP',
    NOTIFICATIONS = 'NOTIFICATIONS',
}

export enum LoadStateActionTypes {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    DEFAULT_STATE = 'DEFAULT_STATE',
}

export const AuthStateActions: StateActions = mapLoadStateActions(ReducerDomains.AUTH);
export const ProfileStateActions: StateActions = mapLoadStateActions(
    ReducerDomains.PROFILE,
);
export const TaskStateActions: StateActions = mapLoadStateActions(ReducerDomains.TASKS);
export const SwapStateActions: StateActions = mapLoadStateActions(ReducerDomains.SWAP);
export const NotificationStateActions: StateActions = mapLoadStateActions(
    ReducerDomains.NOTIFICATIONS,
);

//this may be moved to a more appropriate location?
function mapLoadStateActions(domain): StateActions {
    return {
        Loaded: () => ({ domain: domain, type: LoadStateActionTypes.LOADED }),
        Loading: () => ({ domain: domain, type: LoadStateActionTypes.LOADING }),
        Error: (error) => ({
            domain: domain,
            type: LoadStateActionTypes.ERROR,
            payload: error,
        }),
        DefaultState: () => ({
            domain: domain,
            type: LoadStateActionTypes.DEFAULT_STATE,
        }),
    };
}

interface StateActions {
    Loaded: () => { domain: ReducerDomains; type: LoadStateActionTypes };
    Loading: () => { domain: ReducerDomains; type: LoadStateActionTypes };
    Error: (
        error: ErrorData,
    ) => { domain: ReducerDomains; type: LoadStateActionTypes; payload: ErrorData };
    DefaultState: () => { domain: ReducerDomains; type: LoadStateActionTypes };
}
