import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TopNavigationAction, Icon, Text, Layout } from '@ui-kitten/components';

export const openDrawerAction = (toggleDrawer) => {
    return (
        <TopNavigationAction
            icon={(props) => (
                <Icon {...props} style={{ width: 35, height: 35 }} name="menu" />
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
                <Icon style={{ width: 25, height: 35 }} name="arrow-ios-back" />
                <Text>Back</Text>
            </TouchableOpacity>
            {/* <TopNavigationAction
                icon={(props) => (
                    <Icon
                        {...props}
                        style={{ width: 25, height: 35 }}
                        // animationConfig={}
                        name="arrow-ios-back"
                    />
                )}
                onPress={goBack}
            />
            <Text>Back</Text> */}
        </Layout>
    );
};
