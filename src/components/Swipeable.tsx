import React, { useRef } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

interface SwipeableProps {
    swipeThreshold: number;
    onSwipe: (taskId: number) => void;
    itemId: number;
    toggleScrollParent;
    leftIcon?;
    children?;
}

const Swipeable = (props: SwipeableProps) => {
    const windowWidth = Dimensions.get('window').width;
    const xPosition = useRef(new Animated.Value(0)).current;
    //icon state
    const iconWidth = 100;
    const iconTravelDistance = 75;
    const iconXPosition = useRef(new Animated.Value(-iconWidth)).current;

    const iconScalingInterpolation = xPosition.interpolate({
        inputRange: [0, props.swipeThreshold],
        outputRange: [1, 1.8],
    });
    // const iconColorInterpolation = xPosition.interpolate({
    //     inputRange: [0, windowWidth],
    //     outputRange: ['rgb(0,0,0)', 'rgb(200,200,200)'],
    // });

    // const [iconColor, setIconColor] = useState('#000000');
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (e, g) => {
                if (Math.abs(g.dx) > 5) {
                    return true;
                } else {
                    return false;
                }
            },
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderGrant: () => props.toggleScrollParent(false),
            onPanResponderMove: (event, gestureState) => {
                xPosition.setValue(gestureState.dx);

                //left icon position tracking
                if (gestureState.dx <= iconTravelDistance) {
                    iconXPosition.setValue(gestureState.dx);
                } else iconXPosition.setValue(iconTravelDistance);
            },
            onPanResponderRelease: (e, { dx }) => {
                props.toggleScrollParent(true);
                if (dx >= 250) {
                    return props.onSwipe(props.itemId);
                } else {
                    Animated.parallel([
                        Animated.spring(xPosition, {
                            toValue: 0,
                            useNativeDriver: true,
                        }),
                        Animated.spring(iconXPosition, {
                            toValue: -iconWidth,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderTerminate: () => {
                props.toggleScrollParent(true);
                Animated.spring(xPosition, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            },
        }),
    ).current;

    return (
        <View
            style={{
                flexDirection: 'row',
                width: windowWidth,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Animated.View
                style={{
                    width: 100,
                    position: 'absolute',
                    left: -80,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                        {
                            translateX: iconXPosition,
                        },
                        {
                            scale: iconScalingInterpolation,
                        },
                    ],
                }}
            >
                {props.leftIcon()}
            </Animated.View>
            <Animated.View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                    transform: [{ translateX: xPosition }],
                }}
                {...panResponder.panHandlers}
            >
                {props.children}
            </Animated.View>
        </View>
    );
};

export default Swipeable;
