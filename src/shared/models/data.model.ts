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

class DateInArray {
    id: number;
    date: any;
}
export interface CalendarData {
    dateArray: DateInArray[];
    today: Date;
    renderedMonthRange: Date[];
}
