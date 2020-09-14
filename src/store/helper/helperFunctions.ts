import jwtDecode from 'jwt-decode';
import { LoadStateActionTypes } from '../actions/loadStateActions';

export function extractId(jwt) {
    let decodedAccessKey = jwtDecode(jwt);
    return parseInt(decodedAccessKey.sub.split('|')[1]);
}

export function determineLoadState(updatedState): LoadStateActionTypes | null {
    const values = Object.values(updatedState);
    if (values.indexOf(LoadStateActionTypes.ERROR) >= 0)
        return LoadStateActionTypes.ERROR;
    else if (values.indexOf(LoadStateActionTypes.LOADING) >= 0)
        return LoadStateActionTypes.LOADING;
    else if (values.indexOf(null) >= 0) return null;
    else return LoadStateActionTypes.LOADED;
}

export function errorDataExtractor(error): ErrorData {
    if (!error.response) return { message: error.message, status: 400 };
    return {
        message: error.response?.data?.message,
        status: error.response?.status,
    };
}

export interface ErrorData {
    message: string;
    status: number;
}
