import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput, BodyText } from '../../shared/components';
import { LoginScreenProps } from '../../shared/models';
import {
    checkCredentials,
    loadStateActionTypes,
    login,
    AuthStateActions,
    ProfileStateActions,
    TaskStateActions,
} from '../../store/actions';
import { determineLoadState } from '../../store/helper';
import { LoadingPage } from '../../components/LoadingPage';

export const LoginScreen = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('shaun.tung@gmail.com');
    const [password, setPassword] = useState<string>('password');
    const [isValidCredentials, setIsValidCredentials] = useState<boolean>(true);

    //selects the loadstates that need to be listened to
    const { AUTH: AuthState, PROFILE: ProfileState, TASKS: TasksState } = useSelector(
        (state) => state.loadStateReducer.loadStatus,
    );

    //selects the error states that need to be listened to
    const { AUTH: AuthError, PROFILE: ProfileError, TASKS: TasksError } = useSelector(
        (state) => state.loadStateReducer.loadErrorStatus,
    );

    //using the loadstates, determines if loading page should be shown
    const loadState = determineLoadState({ AuthState, ProfileState, TasksState });
    //if everything is loaded, change state to login
    if (loadState === loadStateActionTypes.LOADED) dispatch(login());

    //error message handling
    let errorMessage = null;
    if (loadState === loadStateActionTypes.ERROR) {
        //can be cleaned up better, any suggestions?
        if (AuthError) errorMessage = determineErrorMessage(AuthError.message);
        else if (ProfileError) errorMessage = determineErrorMessage(ProfileError.message);
        else if (TasksError) errorMessage = determineErrorMessage(TasksError.message);
        else errorMessage = null;
    }

    const invalidCredentialsWarning = (
        <BodyText style={styles.loginError}>Please enter valid credentials</BodyText>
    );

    if (loadState === loadStateActionTypes.LOADING) return <LoadingPage />;

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.loginScreen}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.feedbackContainer}
                scrollEnabled={false}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/TjcLogo.png')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.loginCardContainer}>
                    {!isValidCredentials && invalidCredentialsWarning}

                    {errorMessage}
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Email: </BodyText>
                        <CustomInput
                            value={email}
                            keyboardType={'email-address'}
                            onChangeText={onTextSubmitted('email')}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Password: </BodyText>
                        <CustomInput
                            value={password}
                            onChangeText={onTextSubmitted('password')}
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <Button title="Login!" onPress={verifyLogin} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button
                            title="Recover Account"
                            onPress={() => props.navigation.navigate('RecoverLogin')}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );

    //helper functions

    //clears all auth related errors, can maybe be trimmed down to reset only ones that aren't null?
    function resetErrorStatus() {
        dispatch(AuthStateActions.ErrorHandled());
        dispatch(ProfileStateActions.ErrorHandled());
        dispatch(TaskStateActions.ErrorHandled());
    }

    function isValidEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function verifyLogin() {
        resetErrorStatus();
        setIsValidCredentials(true);
        if (isValidEmail() && password.length > 0) {
            dispatch(
                checkCredentials({ email: email.toLowerCase(), password: password }),
            );
        } else {
            setIsValidCredentials(false);
        }
    }
    function onTextSubmitted(field) {
        if (field === 'email') {
            return setEmail;
        } else return setPassword;
    }
    function determineErrorMessage(msg) {
        return <BodyText style={styles.loginError}>{msg}</BodyText>;
    }
};

const styles = StyleSheet.create({
    loginScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    feedbackContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: '10%',
        flex: 1,
    },
    loginCardContainer: {
        width: '80%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    loginError: {
        color: 'red',
        fontSize: 14,
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 10,
    },
    inputLabel: {
        fontSize: 15,
        color: 'grey',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        width: '40%',
        margin: 2,
    },
});
