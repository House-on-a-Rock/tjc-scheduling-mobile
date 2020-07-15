import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../shared/constants';
import { RequestSwapStack } from '../navigation/RequestSwap/RequestSwapStack';

interface CustomAnimatedModalProps {
    isVisible: boolean;
    closeModal: () => void;
}

export const CustomAnimatedModal = (props: CustomAnimatedModalProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim2 = useRef(new Animated.Value(0)).current;
    const transformY = useRef(new Animated.Value(-1000)).current;
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(fadeAnim2, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(transformY, {
                toValue: windowHeight * -0.43, //positioning math needs fine tuning
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    }, [fadeAnim, fadeAnim2, transformY]);

    return (
        <Animated.View
            style={{
                height: windowHeight,
                width: windowWidth,
                opacity: fadeAnim,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                bottom: 0,
            }}
        >
            <Modal visible={isVisible} onBackdropPress={props.closeModal}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: transformY,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        opacity: fadeAnim2,
                        width: windowWidth * 0.85,
                        height: windowHeight * 0.85,
                    }}
                >
                    <RequestSwapStack closeModal={props.closeModal} />
                </Animated.View>
            </Modal>
        </Animated.View>
    );
};
