import React from 'react';

import { TopNavigationAction, Icon } from '@ui-kitten/components';

export const openDrawerAction = (toggleDrawer) => {
    return (
        <TopNavigationAction
            icon={(props) => <Icon {...props} name="menu-outline" />}
            onPress={toggleDrawer}
        />
    );
};
