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
    Dimensions,
    ScrollView,
} from 'react-native';
import { CustomInput, BodyText } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { login, setProfile, createCalendar, checkCredentials } from '../../store/actions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState('email@email.com');
    const [userPassword, setUserPassword] = useState('password');
    const [isValidCredentials, setIsValidCredentials] = useState(true);
    const [isValidInput, setIsValidInput] = useState(false);

    let cardWidth = Dimensions.get('window').width;
    let cardHeight = Dimensions.get('window').height;
    // console.log(
    //     'cardwidth, cardheight: ',
    //     Platform.OS === 'ios' ? 'ios' : 'android',
    //     cardWidth,
    //     cardHeight,
    // );

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(userEmail).toLowerCase());
    }

    const verifyLogin = () => {
        //check if email/pass belongs to an account
        //after x attempts, prompt login or account lockout

        if (validateEmail() && userPassword.length > 0) {
            console.log('email is validated');
            //dispatch check credentials action
            dispatch(checkCredentials({ email: userEmail, password: userPassword }));
        } else {
            setIsValidCredentials(false);
            console.log('credentials not ok');
            return;
        }

        if (true) {
            //
            dispatch(login());
            // dispatch(setProfile(profile));
            dispatch(createCalendar());
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.loginScreen}
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'stretch',
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
