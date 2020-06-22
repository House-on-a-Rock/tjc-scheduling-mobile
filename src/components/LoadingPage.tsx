import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export const LoadingPage = (props) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
            }}
        >
            <Layout
                style={{
                    ...{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: props.opacity,
                    },
                    ...props.style,
                }}
            >
                <Spinner size="giant" status="primary" />
            </Layout>
        </SafeAreaView>
    );
};
