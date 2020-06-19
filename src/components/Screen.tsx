import React from 'react';
import { Layout, TopNavigation, Divider } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

type ScreenProps = {
    children?: React.ReactNode;
    title?: string;
    accessoryLeft?: () => JSX.Element;
    accessoryRight?: () => JSX.Element;
};

export const Screen = (props: ScreenProps) => {
    return (
        <SafeAreaView style={styles.screen}>
            <TopNavigation
                alignment="center"
                title={props.title}
                accessoryLeft={props.accessoryLeft}
                accessoryRight={props.accessoryRight}
            ></TopNavigation>
            <Divider />
            {props.children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
    },
    layout: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
