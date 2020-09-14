import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TopNavigationAction, Icon, Text, Layout } from '@ui-kitten/components';

export const openDrawerAction = (toggleDrawer) => {
    return (
        <TopNavigationAction
            icon={(props) => (
                <Icon
                    {...props}
                    style={{ width: 35, height: 35 }}
                    name="menu"
                    fill="#000000"
                />
            )}
            onPress={toggleDrawer}
        />
    );
};

export const backAction = (goBack) => {
    return (
        <Layout
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity
                onPress={goBack}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon
                    style={{ width: 25, height: 35 }}
                    name="arrow-ios-back"
                    fill="#000000"
                />
                <Text>Back</Text>
            </TouchableOpacity>
        </Layout>
    );
};

export const closeStackAction = (closeStack) => {
    return (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name="close-square" fill="#000000" />}
        />
    );
};
