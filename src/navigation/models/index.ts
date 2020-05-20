import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type DrawerStackParamList = {
    HomeStack: undefined;
    ProfileStack: undefined;
    SettingsStack: undefined;
    LogoutStack: undefined;
};

export type LogoutParamList = {
    Logout: undefined;
};

export type LogoutStackNavigationProp = CompositeNavigationProp<
    StackNavigationProp<LogoutParamList, 'Logout'>,
    StackNavigationProp<DrawerStackParamList>
>;

export type ProfStackParamList = {
    Profile: undefined;
};

export type SettingsParamList = {
    Settings: undefined;
};

export type ScheStackParamList = {
    Schedule: undefined;
};

export type MainStackParamList = {
    Calendar: undefined;
    Schedule: undefined;
};
