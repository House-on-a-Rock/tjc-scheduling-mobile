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

    //using the loadstates, determines if loading page should be shown
    const loadState = determineLoadState({ AuthState, ProfileState, TasksState });
    if (loadState === loadStateActionTypes.LOADED) dispatch(login());

    const { AUTH: AuthError, PROFILE: ProfileError, TASKS: TasksError } = useSelector(
        (state) => state.loadStateReducer.loadErrorStatus,
    );
    console.log('AuthError', AuthError?.status);
    // console.log('ProfileError', ProfileError);
    // console.log('TasksError', TasksError);

    function resetErrorStatus() {
        dispatch(AuthStateActions.ErrorHandled());
        dispatch(ProfileStateActions.ErrorHandled());
        dispatch(TaskStateActions.ErrorHandled());
    }

    function isValidEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const verifyLogin = () => {
        resetErrorStatus();
        setIsValidCredentials(true);
        if (isValidEmail() && password.length > 0) {
            dispatch(checkCredentials({ email: email, password: password }));
        } else {
            setIsValidCredentials(false);
        }
    };

    const incorrectAuthCredentialsWarning = (
        <BodyText style={styles.loginError}>
            Invalid email and password combination
        </BodyText>
    );

    const serverErrorWarning = (
        <BodyText style={styles.loginError}>
            Error retrieving your profile, please try again later
        </BodyText>
    );

    const invalidCredentialsWarning = (
        <BodyText style={styles.loginError}>Please enter valid credentials</BodyText>
    );

    function onTextEntered(field) {
        if (field === 'email') {
            return setEmail;
        } else return setPassword;
    }

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
                    {AuthError !== null && incorrectAuthCredentialsWarning}
                    {(ProfileError !== null || TasksError !== null) && serverErrorWarning}
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Email: </BodyText>
                        <CustomInput
                            value={email}
                            keyboardType={'email-address'}
                            onChangeText={onTextEntered('email')}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Password: </BodyText>
                        <CustomInput
                            value={password}
                            onChangeText={onTextEntered('password')}
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
                            title="Sign Up!"
                            onPress={() => props.navigation.navigate('SignUp')}
                        />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button
                            title="Recover Password"
                            onPress={() => props.navigation.navigate('RecoverLogin')}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
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
