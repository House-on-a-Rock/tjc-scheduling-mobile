import { LoadingActionTypes } from '../helper/loadableState';
import { ProfileData } from '../../shared/models';

export const fetchProfile = () => {
    return {
        type: LoadingActionTypes.LOADING,
    };
};

export const setProfile = (profile: ProfileData) => {
    return {
        type: LoadingActionTypes.LOADED,
        payload: profile,
    };
};

export const editProfile = (profile: ProfileData) => {};

export const ProfileActionTypes = {
    ...LoadingActionTypes,
};
