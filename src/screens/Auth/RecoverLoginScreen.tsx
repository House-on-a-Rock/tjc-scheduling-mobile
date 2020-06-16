import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RecoverLoginScreenProps } from '../../shared/models';
import { CustomInput, BodyText } from '../../shared/components';

export const RecoverLoginScreen = (props: RecoverLoginScreenProps) => {
    const [email, setEmail] = useState<string>('shaun.tung@gmail.com');

    return (
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
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
                    <Button
                        title="Submit"
                        onPress={() => console.log('submit pressed')}
                    />
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
        backgroundColor: 'grey',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 20,
    },
    inputStyle: {
        // width: '100%',
        width: 300,
        paddingVertical: 10,
        // backgroundColor: 'red',
    },
    buttonContainer: {
        backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    buttonStyle: {
        width: '40%',
        margin: 2,
    },
});
