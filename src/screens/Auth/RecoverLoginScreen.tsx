import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import { RecoverLoginScreenProps } from '../../shared/models';
import { CustomInput, BodyText } from '../../shared/components';
import { sendResetEmail, loadStateActionTypes } from '../../store/actions';
import { LoadingPage } from '../../components/LoadingPage';
import { Screen } from '../../components/Screen';
import { TopNavigationAction, Icon } from '@ui-kitten/components';

export const RecoverLoginScreen = (props: RecoverLoginScreenProps) => {
    const [email, setEmail] = useState<string>('shaun.tung@gmail.com');
    const dispatch = useDispatch();
    const loadState: loadStateActionTypes = useSelector(
        (state) => state.loadStateReducer.loadStatus.AUTH,
    );

    const onSubmitHandler = (): void => {
        dispatch(sendResetEmail(email));
    };

    if (loadState === loadStateActionTypes.LOADING) return <LoadingPage />;

    const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const navigateBack = () => {
        props.navigation.goBack();
    };

    return (
        <Screen title="Recover Login" accessoryLeft={() => BackAction(navigateBack)}>
            <View style={styles.screen}>
                <View style={styles.inputContainer}>
                    {loadState === loadStateActionTypes.LOADED && (
                        <BodyText style={{ fontSize: 25, color: 'blue' }}>
                            Email has been sent!
                        </BodyText>
                    )}
                    <BodyText style={styles.inputLabel}>
                        Please enter your email:{' '}
                    </BodyText>

                    <CustomInput
                        style={styles.inputStyle}
                        value={email}
                        keyboardType={'email-address'}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonStyle}>
                        <Button
                            title="Email me a recovery link"
                            onPress={onSubmitHandler}
                        />
                    </View>
                </View>
            </View>
        </Screen>
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
