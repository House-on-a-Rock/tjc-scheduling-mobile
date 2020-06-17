import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BodyText, CustomInput } from '../../shared/components';
import { SignUpScreenProps } from '../../shared/models';
import { SafeAreaView } from 'react-native';
import {
    Divider,
    Icon,
    Layout,
    Text,
    TopNavigation,
    TopNavigationAction,
    Button,
} from '@ui-kitten/components';
import { ThemeContext } from '../../../theme-context';

export const SignUpScreen = (props: SignUpScreenProps) => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');

    const onSignUpHandler = () => {
        //make api call
    };

    const navigateBack = () => {
        props.navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

    const themeContext = React.useContext(ThemeContext);

    return (
        <SafeAreaView
            style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
            }}
        >
            <TopNavigation title="MyApp" alignment="center" accessoryLeft={BackAction} />
            <Divider />
            <Layout
                style={{
                    // height: '100%',
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text category="h1">details</Text>
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>
                    TOGGLE THEME
                </Button>
            </Layout>
        </SafeAreaView>
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
