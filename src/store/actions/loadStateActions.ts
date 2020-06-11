export enum reducerDomains {
    AUTH,
    PROFILE,
    TASKS,
    CALENDAR,
}

export enum loadStateActionTypes {
    LOADED,
    LOADING,
    ERROR,
    ERRORHANDLED,
}

export const AuthStateActions = mapLoadStateActions(reducerDomains.AUTH)();
export const ProfileStateActions = mapLoadStateActions(reducerDomains.PROFILE)();
export const TaskStateActions = mapLoadStateActions(reducerDomains.TASKS)();
export const CalendarStateActions = mapLoadStateActions(reducerDomains.CALENDAR)();

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
            ErrorHandled: (error) => ({
                domain: domain,
                type: loadStateActionTypes.LOADED,
                payload: error,
            }),
        };
    };
}
