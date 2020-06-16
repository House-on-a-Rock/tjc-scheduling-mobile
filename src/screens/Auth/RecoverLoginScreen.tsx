import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import { RecoverLoginScreenProps } from '../../shared/models';
import { CustomInput, BodyText } from '../../shared/components';
import { sendResetEmail, loadStateActionTypes } from '../../store/actions';
import { LoadingPage } from '../../components/LoadingPage';

export const RecoverLoginScreen = (props: RecoverLoginScreenProps) => {
    const [email, setEmail] = useState<string>('shaun.tung@gmail.com');
    const dispatch = useDispatch();
    const loadState = useSelector((state) => state.loadStateReducer.loadStatus.AUTH);

    const onSubmitHandler = () => {
        console.log('submit pressed');
        dispatch(sendResetEmail(email));
    };

    if (loadState === loadStateActionTypes.LOADING) return <LoadingPage />;

    return (
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                {loadState === loadStateActionTypes.LOADED && (
                    <BodyText style={{ fontSize: 25, color: 'blue' }}>
                        Email has been sent!
                    </BodyText>
                )}
                <BodyText style={styles.inputLabel}>Please enter your email: </BodyText>

                <CustomInput
                    style={styles.inputStyle}
                    value={email}
                    keyboardType={'email-address'}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button title="Email me a recovery link" onPress={onSubmitHandler} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 20,
    },
    inputStyle: {
        width: 300,
        paddingVertical: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    buttonStyle: {
        width: '80%',
        margin: 2,
    },
});
