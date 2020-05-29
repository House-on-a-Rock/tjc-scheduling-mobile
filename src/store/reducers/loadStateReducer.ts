// import { CHANGE_LOAD_STATE } from '../actions';
// import { AsyncStorage } from 'react-native';

// const initialState = {
//     loadState: 'loaded',
// };

// export const loadStateReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CHANGE_LOAD_STATE:
//             handleStateChange(action.payload);
//             return {
//                 ...state,
//                 loadState: action.payload,
//             };

//         default:
//             return state;
//     }
// };

// const handleStateChange = (newState) => {
//     AsyncStorage.setItem('@tjc-scheduling-app:loadState', newState); //TODO replace string ID with a variable
// };

// models
// export interface LoadableDataModel<T> {
//     loading: boolean;
//     loaded: boolean;
//     error: any;
//     data: T;
// }

// interface LoadableActionTypesInterfaceModel {
//     loadingActionType?: string;
//     successActionType?: string;
//     errorActionType?: string;
//     dismissActionType?: string;
// }

// function onLoadableLoad(loadable) {
//     return {
//         ...loadable,
//         loading: true,
//         loaded: false,
//         data: null,
//         error: null,
//     };
// }

// function onLoadableSuccess(loadable) {
//     return {
//         ...loadable,
//         loading: false,
//         loaded: true,
//         error: null,
//     };
// }

// function onLoadableError(loadable, error) {
//     return {
//         ...loadable,
//         loading: false,
//         loaded: false,
//         error: error,
//     };
// }

// function onLoadableDismiss(loadable) {
//     return {
//         ...loadable,
//         ...createDefaultLoadable(),
//     };
// }

// export function createDefaultLoadable() {
//     return {
//         loading: false,
//         loaded: false,
//         error: null,
//     };
// }

// export function createDefaultState<T>(): LoadableDataModel<T> {
//     return {
//         ...createDefaultLoadable(),
//         data: null,
//     };
// }

// export function withLoadable(baseReducer, actionType: LoadableActionTypesInterfaceModel) {
//     return (state, action) => {
//         switch (action.type) {
//             case actionType.loadingActionType:
//                 state = onLoadableLoad(state);
//                 break;

//             case actionType.successActionType:
//                 state = onLoadableSuccess(state);
//                 break;

//             case actionType.errorActionType:
//                 state = onLoadableError(state, action.payload.error);
//                 break;

//             case actionType.dismissActionType:
//                 state = onLoadableDismiss(state);
//                 break;
//         }

//         return baseReducer(state, action);
//     };
// }
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
