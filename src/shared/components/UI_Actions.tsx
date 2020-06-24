import React from 'react';

import { TopNavigationAction, Icon } from '@ui-kitten/components';

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
