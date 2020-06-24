import React from 'react';
import { Text } from '@ui-kitten/components';

export function isValidEmail(email: string): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

export const errorCaption: RenderProp<TextProps> = (caption: string) => (
    <Text status="warning" category="s2">
        {caption}
    </Text>
);
