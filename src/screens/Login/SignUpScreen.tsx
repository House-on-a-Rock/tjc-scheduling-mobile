import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Button,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BodyText, CustomInput } from '../../utils/components';

export const SignUpScreen = (props) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const onSignUpHandler = () => {
        //make api call
        console.log('signup pressed');
    };

    return (
        <KeyboardAvoidingView
            style={styles.signUpScreen}
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
                        <BodyText style={styles.inputLabel}>Enter your email: </BodyText>
                        <CustomInput
                            value={userEmail}
                            keyboardType={'email-address'}
                            onChangeText={setUserEmail}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Choose a password: </BodyText>
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
                    <Button title="Sign Up!" onPress={onSignUpHandler} />
                </View>
                <View style={{ width: '40%' }}>
                    <Button
                        title="Return to login"
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    signUpScreen: {
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
        fontSize: 14,
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
