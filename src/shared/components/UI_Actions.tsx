import React from 'react';

import { TopNavigationAction, Icon, Text, Layout } from '@ui-kitten/components';

export const openDrawerAction = (toggleDrawer) => {
    return (
        <TopNavigationAction
            icon={(props) => (
                <Icon
                    {...props}
                    style={{ width: 35, height: 35 }}
                    animation="zoom"
                    // animationConfig={}
                    name="menu"
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
            <TopNavigationAction
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
            <Text>Back</Text>
        </Layout>
    );
};
