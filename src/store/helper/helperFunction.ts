import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';

export function extractId(jwt) {
    let decodedAccessKey = jwtDecode(jwt);
    return parseInt(decodedAccessKey.sub.split('|')[1]);
}
