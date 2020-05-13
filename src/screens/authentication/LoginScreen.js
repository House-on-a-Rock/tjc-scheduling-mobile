import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Button,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { CustomInput, BodyText } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { login, checkCredentials } from '../../store/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('email@email.com');
    const [userPassword, setUserPassword] = useState('password');
    const [isValidCredentials, setIsValidCredentials] = useState(true);
    const [isValidInput, setIsValidInput] = useState(false);

    function isValidEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(userEmail).toLowerCase());
    }

    const verifyLogin = () => {
        //after x attempts, prompt login or account lockout
        if (isValidEmail() && userPassword.length > 0) {
            dispatch(checkCredentials({ email: userEmail, password: userPassword }));
        } else {
            setIsValidCredentials(false);
            return;
        }

        if (true) {
            //login works
            dispatch(login());
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.loginScreen}
            // behavior={Platform.OS === 'ios' ? 'padding' : null}
            behavior={'padding'}
        >
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
                    {!isValidCredentials ? (
                        <BodyText style={styles.loginWarning}>
                            Please enter valid credentials
                        </BodyText>
                    ) : (
                        <View></View>
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
                            onPress={() => props.navigation.navigate('SignUpScreen')}
                        />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button
                            title="Recover Password"
                            onPress={() =>
                                props.navigation.navigate('RecoverLoginScreen')
                            }
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
        // alignItems: 'stretch',
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
    loginWarning: {
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
