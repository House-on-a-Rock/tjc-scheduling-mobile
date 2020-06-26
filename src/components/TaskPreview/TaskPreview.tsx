import React from 'react';
import { Dimensions } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { calendarCardDimensions } from '../../shared/constants';

const previewHeight = calendarCardDimensions.totalHeight;
const windowHeight = Dimensions.get('window').height;

export const TaskPreview = (props) => {
    return (
        <Layout style={{ height: windowHeight - previewHeight, width: '100%' }}>
            <Text>Task Preview</Text>
        </Layout>
    );
};
