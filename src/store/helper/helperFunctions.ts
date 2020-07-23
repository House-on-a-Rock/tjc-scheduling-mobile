import jwtDecode from 'jwt-decode';
import { loadStateActionTypes } from '../actions/loadStateActions';

export function extractId(jwt) {
    let decodedAccessKey = jwtDecode(jwt);
    return parseInt(decodedAccessKey.sub.split('|')[1]);
}

export function determineLoadState(updatedState): loadStateActionTypes | null {
    const values = Object.values(updatedState);
    if (values.indexOf(loadStateActionTypes.ERROR) >= 0)
        return loadStateActionTypes.ERROR;
    else if (values.indexOf(loadStateActionTypes.LOADING) >= 0)
        return loadStateActionTypes.LOADING;
    else if (values.indexOf(null) >= 0) return null;
    else return loadStateActionTypes.LOADED;
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
