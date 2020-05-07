import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import { CustomInput, BodyText } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { login, setProfile, createCalendar, checkCredentials } from '../../store/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import profile from '../../dummyData';
import axios from 'axios';

export const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('email@email.com');
    const [userPassword, setUserPassword] = useState('password');
    const [isValidCredentials, setIsValidCredentials] = useState(true);

    //hook to determine if login attempt was made and failed to display failed login text
    useEffect(() => {
        console.log('inside useeffect');
        // let URL = 'https://facebook.github.io/react-native/movies.json';
        // Axios.get(URL).then((response) => {
        //     console.log('get response: ', JSON.stringify(response.data));
        // }); http://10.0.0.8:8080/api/churches/getAll
        axios.get('http://10.0.0.8:8080/api/churches/getAll').then((response) => {
            console.log('************** ', response.data);
        });
    });

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(userEmail).toLowerCase());
    }

    const verifyLogin = () => {
        //check if email/pass belongs to an account
        //after x attempts, prompt login or account lockout

        if (validateEmail() && userPassword.length > 5) {
            console.log('email is validated');
            //dispatch check credentials action
            dispatch(checkCredentials({ email: userEmail, password: userPassword }));
        } else {
            setIsValidCredentials(false);
            console.log('credentials not ok');
            return;
        }

        if (true) {
            dispatch(login());
            dispatch(setProfile(profile));
            dispatch(createCalendar());
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.loginScreen}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                style={styles.feedbackContainer}
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
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button title="Login" onPress={verifyLogin} />
                </View>
                <View style={styles.buttonStyle}>
                    <Button
                        title="Sign Up!"
                        onPress={() => props.navigation.navigate('SignUpScreen')}
                    />
                </View>
                <View style={{ width: '40%' }}>
                    <Button
                        title="Forgot Password"
                        onPress={() => props.navigation.navigate('RecoverLoginScreen')}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'stretch',
    },
    feedbackContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '60%',
        justifyContent: 'space-around',
        alignItems: 'center',
        // flex: 1,
    },
    imageContainer: {
        width: '80%',
        height: '10%',
        flex: 3,
    },
    loginCardContainer: {
        width: '80%',
        height: '20%',
        alignItems: 'center',
        flex: 1,
    },
    loginWarning: {
        color: 'red',
        fontSize: 14,
    },
    buttonContainer: {
        height: '30%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputStyle: {
        width: '80%',
        paddingVertical: 10,
    },
    inputLabel: {
        fontSize: 12,
        color: 'grey',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonStyle: {
        width: '25%',
    },
});
