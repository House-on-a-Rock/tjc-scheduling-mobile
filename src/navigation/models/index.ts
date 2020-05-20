import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// ParamList
export type DrawerStackParamList = {
    HomeStack: undefined;
    ProfileStack: undefined;
    SettingsStack: undefined;
    LogoutStack: undefined;
};

export type LogoutStackParamList = {
    Logout: undefined;
};

export type ProfileStackParamList = {
    Profile: undefined;
};

export type SettingsStackParamList = {
    Settings: undefined;
};

// LogoutScreen

export type LogoutRouteProp = RouteProp<LogoutStackParamList, 'Logout'>;

export type LogoutStackNavigationProp = CompositeNavigationProp<
    StackNavigationProp<LogoutStackParamList, 'Logout'>,
    StackNavigationProp<DrawerStackParamList>
>;

export type LogoutScreenProps = {
    route: LogoutRouteProp;
    navigation: LogoutStackNavigationProp;
};

// ProfileScreen

export type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

export type ProfileStackNavigationProp = CompositeNavigationProp<
    StackNavigationProp<ProfileStackParamList, 'Profile'>,
    StackNavigationProp<DrawerStackParamList>
>;

export type ProfileScreenProps = {
    route: ProfileRouteProp;
    navigation: ProfileStackNavigationProp;
};

// Settings

export type SettingsRouteProp = RouteProp<SettingsStackParamList, 'Settings'>;

export type SettingsStackNavigationProp = CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, 'Settings'>,
    StackNavigationProp<DrawerStackParamList>
>;

export type SettingsScreenProps = {
    route: SettingsRouteProp;
    navigation: SettingsStackNavigationProp;
};

// HomeStack / Tab

export type HomeStackTabParamList = {
    CalendarStack: undefined;
    ScheduleStack: undefined;
};

export type CalendarStackParamList = {
    Calendar: undefined;
    Tasks: undefined;
};

export type ScheduleStackParamList = {
    Schedule: undefined;
};

// ScheduleScreen

export type ScheduleRouteProp = RouteProp<CalendarStackParamList, 'Tasks'>;

export type ScheduleScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<ScheduleStackParamList, 'Schedule'>,
    CompositeNavigationProp<
        BottomTabNavigationProp<HomeStackTabParamList>,
        StackNavigationProp<DrawerStackParamList>
    >
>;

export type ScheduleScreenProps = {
    route: CalendarRouteProp;
    navigation: ScheduleScreenNavigationProp;
};

// CalendarScreen
export type CalendarRouteProp = RouteProp<CalendarStackParamList, 'Calendar'>;

// export type CalendarStackRouteProp = RouteProp<HomeStackTabParamList, 'CalendarStack'>; // unused

// export type CalendarStackNavigationProp = CompositeNavigationProp<
//     BottomTabNavigationProp<HomeStackTabParamList, 'CalendarStack'>,
//     StackNavigationProp<DrawerStackParamList> // unused
// >;

export type CalendarScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<CalendarStackParamList, 'Calendar'>,
    CompositeNavigationProp<
        BottomTabNavigationProp<HomeStackTabParamList>,
        StackNavigationProp<DrawerStackParamList>
    >
>;

export type CalendarScreenProps = {
    route: CalendarRouteProp;
    navigation: CalendarScreenNavigationProp;
};

// Tasks
export type TasksRouteProp = RouteProp<CalendarStackParamList, 'Tasks'>;

export type TasksScreenNavigationProp = CompositeNavigationProp<
    StackNavigationProp<CalendarStackParamList, 'Tasks'>,
    CompositeNavigationProp<
        BottomTabNavigationProp<HomeStackTabParamList>,
        StackNavigationProp<DrawerStackParamList>
    >
>;

export type TasksScreenProps = {
    route: CalendarRouteProp;
    navigation: TasksScreenNavigationProp;
};

// export type CalendarScreenProps = {
//     route: CalendarRouteProp;
//     navigation: CalendarNavigationProp;
// };
