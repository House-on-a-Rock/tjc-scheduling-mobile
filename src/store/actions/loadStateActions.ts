export const reducerDomains = {
    AUTH: 'AUTH',
    PROFILE: 'PROFILE',
    TASKS: 'TASKS',
    CALENDAR: 'CALENDAR',
};

export const loadStateActionTypes = {
    LOADED: 'LOADED',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
};

export const AuthStateActions = mapLoadStateActions(reducerDomains.AUTH)();
export const ProfileStateActions = mapLoadStateActions(reducerDomains.PROFILE)();
export const TaskStateActions = mapLoadStateActions(reducerDomains.TASKS)();
export const CalendarStateActions = mapLoadStateActions(reducerDomains.CALENDAR)();

function mapLoadStateActions(domain) {
    return () => {
        return {
            Loaded: () => ({ domain: domain, type: loadStateActionTypes.LOADED }),
            Loading: () => ({ domain: domain, type: loadStateActionTypes.LOADING }),
            Error: () => ({ domain: domain, type: loadStateActionTypes.ERROR }),
            ErrorHandled: () => ({ domain: domain, type: loadStateActionTypes.LOADED }),
        };
    };
}
