//currently all are unused, TODO typescriptify the new load reducer
export interface ProfileData {
    Church: {
        name: string;
    };
    email: string;
    firstName: string;
    lastName: string;
    tasks?: [];
    id: number | null;
}

export interface TaskData {
    date: string;
    role: RoleTypes;
    church: { name: string };
}

type RoleTypes = 'Speaker' | 'AV' | 'Hymn Leader' | 'Piano Player';

export interface CalendarData {
    dateArray: Date[];
    today: Date;
    isRefreshing: boolean;
    selectedDate: Date;
}

export interface AuthData {
    isLoggedIn: boolean;
    isValidLogin: boolean;
}
