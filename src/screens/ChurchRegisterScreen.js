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
import { CustomInput, BodyText } from '../utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from 'axios';
import { secret_ip } from '../../secrets/secrets';

export const ChurchRegisterScreen = (props) => {
    const [churchName, setChurchName] = useState('');
    const [churchAddress, setChurchAddress] = useState('');
    const [churchDetails, setChurchDetails] = useState('');

    const onSignUpHandler = async () => {
        //make api call
        console.log('signup pressed');
        setChurchName('');
        setChurchAddress('');
        setChurchDetails('');
        await axios
            .get(secret_ip + '/api/churches/getAll')
            .then((response) => console.log(response.data))
            .catch((err) => {
                console.error(err.response.data);
                console.error(err.response.status);
                console.error(err.response.headers);
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={-5000}
            contentContainerStyle={styles.keyboardAvoid}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                style={styles.feedbackContainer}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/TjcLogo.png')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.loginCardContainer}>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Church Name: </BodyText>
                        <CustomInput
                            value={churchName}
                            keyboardType={'email-address'}
                            onChangeText={setChurchName}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Church Address: </BodyText>
                        <CustomInput
                            value={churchAddress}
                            onChangeText={setChurchAddress}
                        />
                    </View>
                    <View style={styles.inputStyle}>
                        <BodyText style={styles.inputLabel}>Church Details: </BodyText>
                        <CustomInput
                            value={churchDetails}
                            onChangeText={setChurchDetails}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button title="Register!" onPress={onSignUpHandler} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'stretch',
    },
    keyboardAvoid: {
        padding: 0,
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
        height: '60%',
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // flex: 1
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
