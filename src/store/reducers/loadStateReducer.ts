import { CHANGE_LOAD_STATE } from '../actions';
import { AsyncStorage } from 'react-native';

const initialState = {
    loadState: 'loaded',
};

export const loadStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOAD_STATE:
            handleStateChange(action.payload);
            return {
                ...state,
                loadState: action.payload,
            };

        default:
            return state;
    }
};

const handleStateChange = (newState) => {
    AsyncStorage.setItem('@tjc-scheduling-app:loadState', newState); //TODO replace string ID with a variable
};
