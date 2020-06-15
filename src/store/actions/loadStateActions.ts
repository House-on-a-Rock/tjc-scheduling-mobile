export enum reducerDomains {
    AUTH = 'AUTH',
    PROFILE = 'PROFILE',
    TASKS = 'TASKS',
}

export enum loadStateActionTypes {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    ERROR_HANDLED = 'ERROR_HANDLED',
}

export const AuthStateActions = mapLoadStateActions(reducerDomains.AUTH)();
export const ProfileStateActions = mapLoadStateActions(reducerDomains.PROFILE)();
export const TaskStateActions = mapLoadStateActions(reducerDomains.TASKS)();

//this may be moved to a more appropriate location?
function mapLoadStateActions(domain) {
    return () => {
        return {
            Loaded: () => ({ domain: domain, type: loadStateActionTypes.LOADED }),
            Loading: () => ({ domain: domain, type: loadStateActionTypes.LOADING }),
            Error: (error) => ({
                domain: domain,
                type: loadStateActionTypes.ERROR,
                payload: error,
            }),
            ErrorHandled: () => ({
                domain: domain,
                type: loadStateActionTypes.ERROR_HANDLED,
            }),
        };
    };
}
