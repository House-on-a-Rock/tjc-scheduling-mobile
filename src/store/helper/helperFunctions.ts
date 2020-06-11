import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import { loadStateActionTypes } from '../actions';

export function extractId(jwt) {
    let decodedAccessKey = jwtDecode(jwt);
    return parseInt(decodedAccessKey.sub.split('|')[1]);
}

export function determineLoadState(updatedState) {
    const values = Object.values(updatedState);
    if (values.indexOf(loadStateActionTypes.ERROR) >= 0)
        return loadStateActionTypes.ERROR;
    else if (values.indexOf(loadStateActionTypes.LOADING) >= 0)
        return loadStateActionTypes.LOADING;
    else return loadStateActionTypes.LOADED;
}
