import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Button, Text, Icon, Layout, Input } from '@ui-kitten/components';

interface EmailInputProps {
    label: string;
    value: string;
    caption?: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
}
interface PasswordInputProps {
    label: string;
    value: string;
    caption?: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

const errorCaption: RenderProp<TextProps> = (caption: string) => (
    <Text status="warning" category="s2">
        {caption}
    </Text>
);

export const EmailInput = ({ label, value, caption, onChangeText }: EmailInputProps) => {
    return (
        <View style={{ width: '100%', paddingVertical: 10 }}>
            <Input
                label={label}
                value={value}
                caption={errorCaption(caption)}
                keyboardType={'email-address'}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export const PasswordInput = ({
    label,
    value,
    caption,
    onChangeText,
}: PasswordInputProps) => {
    return (
        <View style={{ width: '100%', paddingVertical: 10 }}>
            <Input
                label={label}
                value={value}
                caption={errorCaption(caption)}
                onChangeText={onChangeText}
                secureTextEntry={true}
            />
        </View>
    );
};
