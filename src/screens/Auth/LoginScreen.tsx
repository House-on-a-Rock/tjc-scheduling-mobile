import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginScreenProps } from '../../shared/models';
import { checkCredentials, loadStateActionTypes, login } from '../../store/actions';
import { determineLoadState } from '../../store/helper';
import { LoadingPage } from '../../components/LoadingPage';
import { Button, Text, Icon, Layout, Input } from '@ui-kitten/components';
import Constants from 'expo-constants';

export const LoginScreen = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('amanda.chin@gmail.com');
    const [password, setPassword] = useState<string>('password4');
    const [isValidCredentials, setIsValidCredentials] = useState<boolean>(true);
    const statusBarHeight = Constants.statusBarHeight;

    //selects the loadstates that need to be listened to
    const { AUTH: AuthState, PROFILE: ProfileState, TASKS: TasksState } = useSelector(
        (state) => state.loadStateReducer.loadStatus,
    );

    //selects the error states that need to be listened to
    const { AUTH: AuthError, PROFILE: ProfileError, TASKS: TasksError } = useSelector(
        (state) => state.loadStateReducer.loadErrorStatus,
    );

    //using the loadstates, determines if loading page should be shown
    const loadState: loadStateActionTypes = determineLoadState({
        AuthState,
        ProfileState,
        TasksState,
    });
    //if everything is loaded, change state to login
    if (loadState === loadStateActionTypes.LOADED) dispatch(login());

    //error message handling
    let errorMessage: React.ReactNode | null = null;
    if (loadState === loadStateActionTypes.ERROR) {
        //can be cleaned up better, any suggestions?
        if (AuthError) errorMessage = determineErrorMessage(AuthError.message);
        else if (ProfileError) errorMessage = determineErrorMessage(ProfileError.message);
        else if (TasksError) errorMessage = determineErrorMessage(TasksError.message);
        else errorMessage = null;
    }

    const invalidCredentialsWarning: React.ReactNode = (
        <Text category={'h6'} status={'danger'}>
            Please enter valid credentials
        </Text>
    );

    const FacebookIcon = (props) => <Icon name="facebook" {...props} />;

    if (loadState === loadStateActionTypes.LOADING) return <LoadingPage />;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
            }}
        >
            <Layout>
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
                                <Text appearance="hint">Email: </Text>
                                <Input
                                    value={email}
                                    keyboardType={'email-address'}
                                    onChangeText={onTextSubmitted('email')}
                                />
                            </View>
                            <View style={styles.inputStyle}>
                                <Text appearance={'hint'}>Password: </Text>
                                <Input
                                    value={password}
                                    onChangeText={onTextSubmitted('password')}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonStyle}>
                                <Button status={'success'} onPress={verifyLogin}>
                                    Login!
                                </Button>
                            </View>
                            <View style={styles.buttonStyle}>
                                <Button
                                    onPress={() =>
                                        props.navigation.navigate('RecoverLogin')
                                    }
                                >
                                    Recover Account
                                </Button>
                            </View>
                            <View>
                                <Button
                                    accessoryLeft={FacebookIcon}
                                    onPress={() => props.navigation.navigate('SignUp')}
                                >
                                    Sign Up!
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </Layout>
        </SafeAreaView>
    );

    //helper functions

    function isValidEmail(): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function verifyLogin(): void {
        setIsValidCredentials(true);
        if (isValidEmail() && password.length > 0) {
            dispatch(
                checkCredentials({ email: email.toLowerCase(), password: password }),
            );
        } else {
            setIsValidCredentials(false);
        }
    }
    function onTextSubmitted(
        field: string,
    ): React.Dispatch<React.SetStateAction<string>> {
        if (field === 'email') {
            return setEmail;
        } else return setPassword;
    }
    function determineErrorMessage(msg): React.ReactNode {
        return (
            <Text category={'h6'} status={'danger'}>
                {msg}
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    loginScreen: {
        height: '100%',
        width: '100%',
    },
    feedbackContainer: {
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

    image: {
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        width: '40%',
        margin: 2,
    },
});
