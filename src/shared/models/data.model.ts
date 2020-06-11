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
    date: Date;
    role: RoleTypes;
}

type RoleTypes = 'Speaker' | 'AV' | 'Hymn Leader' | 'Piano Player';

export interface CalendarData {
    dateArray: Date[];
    today: Date;
    isRefreshing: boolean;
}
