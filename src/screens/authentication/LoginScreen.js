import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { login, setProfile, createCalendar } from '../../store/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import profile from '../../dummyData';
import axios from 'axios';

export const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    //hook to determine if login attempt was made and failed to display failed login text

    const verifyLogin = async () => {
        //check if email input is valid
        //check if email/pass belongs to an account
        //after x attempts, prompt login or account lockout
        if (true) {
            dispatch(login());
            dispatch(setProfile(profile));
            dispatch(createCalendar());
        }
        await axios
            .get('http://10.0.0.49:8080/')
            .then((response) => console.log(response.data))
            .catch((err) => {
                if (err && err.response) {
                    console.error(err.response.data);
                    console.error(err.response.status);
                    console.error(err.response.headers);
                } else {
                    console.error(err);
                }
            });

        console.log('pressed');

        console.log('finished');
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
