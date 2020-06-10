import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomInput, BodyText } from '../../shared/components';
import { LoginScreenProps } from '../../shared/models';
import {
    checkCredentials,
    AuthStateActions,
    loadStateActionTypes,
} from '../../store/actions';
import { LoadingPage } from '../../components/LoadingPage';

export const LoginScreen = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState<string>('Jonathan.Lee@gmail.com');
    const [userPassword, setUserPassword] = useState<string>('password3');
    const [isValidCredentials, setIsValidCredentials] = useState<boolean>(true);
    const loginState = useSelector((state) => state.loadStateReducer.loadState);

    function isValidEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(userEmail).toLowerCase());
    }

    const verifyLogin = () => {
        //after x attempts, prompt login or account lockout?
        if (isValidEmail() && userPassword.length > 0) {
            dispatch(AuthStateActions.Loading());
            dispatch(checkCredentials({ email: userEmail, password: userPassword }));
            setIsValidCredentials(true);
        } else {
            setIsValidCredentials(false); //displays text to retry credentials
        }
    };

    if (loginState === loadStateActionTypes.LOADING) {
        return <LoadingPage />;
    }

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
                    {!isValidCredentials && (
                        <BodyText style={styles.loginError}>
                            Please enter valid credentials
                        </BodyText>
                    )}
                    {loginState === loadStateActionTypes.ERROR && (
                        <BodyText style={styles.loginError}>
                            Invalid Email and Password Combination
                        </BodyText>
                    )}
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Email: </BodyText>
                        <CustomInput
                            value={userEmail}
                            keyboardType={'email-address'}
                            onChangeText={setUserEmail}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Password: </BodyText>
                        <CustomInput
                            value={userPassword}
                            onChangeText={setUserPassword}
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
