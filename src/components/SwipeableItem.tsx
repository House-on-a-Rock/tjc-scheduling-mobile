//https://medium.com/async-la/swipe-to-delete-with-reanimated-react-native-gesture-handler-bd7d66085aee
import React, { ReactNode } from 'react';
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
    min,
    event,
    cond,
    Value,
    block,
    set,
    eq,
    clockRunning,
    and,
    startClock,
    stopClock,
    spring,
    greaterThan,
    interpolate,
    call,
    Clock,
} = Animated;

interface SwipeableItemProps {
    swipeThreshold: number;
    onSwipe: (taskId: number) => void;
    itemId: number;
    children?;
    leftIcon?: (string) => ReactNode;
}

class SwipeableItem extends React.Component<SwipeableItemProps> {
    state = {
        iconColor: '#000000',
    };

    //icon state and dimensions, can be sent through props later
    iconContainerWidth = 75;
    iconMaxTravelDistance = 15;
    iconMaxScaling = 2;

    //anim vars
    clock = new Clock();
    gestureState = new Value(GestureState.UNDETERMINED);
    shouldDelete = new Value(0);

    //main animState
    animState = {
        finished: new Value(0),
        position: new Value(0),
        velocity: new Value(0),
        time: new Value(0),
    };

    iconAnimState = {
        scaling: new Value(0),
        colorVisible: new Value(0),
    };

    // Spring animation config
    animConfig = {
        toValue: new Value(0),
        damping: 25,
        mass: 0.6,
        stiffness: 70,
        overshootClamping: true,
        restSpeedThreshold: 0.2,
        restDisplacementThreshold: 0.2,
    };

    iconPos = min(
        interpolate(this.animState.position, {
            inputRange: [0, this.props.swipeThreshold],
            outputRange: [-this.iconMaxTravelDistance, this.iconMaxTravelDistance],
        }),
        this.iconMaxTravelDistance, //prevents icon from travelling past max travel distance
    );

    iconScale = min(
        interpolate(this.animState.position, {
            inputRange: [0, this.props.swipeThreshold],
            outputRange: [0.5, 2],
        }),
        this.iconMaxScaling,
    );

    iconRed = () => this.setState({ iconColor: '#DB0300' });

    iconBlack = () => this.setState({ iconColor: '#000000' });

    onHandlerStateChange = event([
        {
            nativeEvent: ({ state }) => {
                return block([
                    // Update gesture state changes
                    set(this.gestureState, state),

                    //resets clock and sets state to finished on swipe if clock was running before, fixes stuttering when holding a row
                    cond(and(eq(state, GestureState.BEGAN), clockRunning(this.clock)), [
                        stopClock(this.clock),
                        set(this.animState.finished, 0),
                    ]),

                    //if gesture has ended and shouldDelete is 1 (truthy), then call the delete function
                    cond(
                        and(eq(state, GestureState.END), eq(this.shouldDelete, 1)),
                        call([this.shouldDelete], () =>
                            this.props.onSwipe(this.props.itemId),
                        ),
                        //else if gesture ended but !shouldDelete, start spring animation
                        cond(
                            and(eq(state, GestureState.END), eq(this.shouldDelete, 0)),
                            startClock(this.clock),
                        ),
                    ),
                ]);
            },
        },
    ]);

    onGestureEvent = event([
        {
            nativeEvent: ({ translationX }) =>
                block([
                    //sets position for row
                    cond(eq(this.gestureState, GestureState.ACTIVE), [
                        set(this.animState.position, translationX),
                    ]),

                    //if past swipe threshold, set shouldDelete to true
                    //determines if icon anim color visible or not
                    cond(
                        and(
                            eq(this.gestureState, GestureState.ACTIVE),
                            greaterThan(translationX, this.props.swipeThreshold),
                        ),
                        [
                            set(this.shouldDelete, 1),
                            set(this.iconAnimState.colorVisible, 1),
                        ],
                        [
                            set(this.shouldDelete, 0),
                            set(this.iconAnimState.colorVisible, 0),
                        ],
                    ),
                ]),
        },
    ]);

    renderRowSpringAnim = () =>
        block([
            cond(clockRunning(this.clock), [
                spring(this.clock, this.animState, this.animConfig),
                // Stop and reset clock when spring is complete
                cond(this.animState.finished, [
                    stopClock(this.clock),
                    set(this.animState.finished, 0),
                ]),
            ]),
        ]);

    renderColorAnim = () =>
        block([
            cond(
                eq(this.iconAnimState.colorVisible, new Value(1)),
                call([], this.iconRed),
                call([], this.iconBlack),
            ),
        ]);

    render() {
        const { children } = this.props;

        return (
            <PanGestureHandler
                activeOffsetX={10}
                onGestureEvent={this.onGestureEvent}
                onHandlerStateChange={this.onHandlerStateChange}
            >
                <Animated.View>
                    <Animated.View //left icon scaling and color
                        style={{
                            width: this.iconContainerWidth,
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [
                                { scale: this.iconScale },
                                { translateX: this.iconPos },
                            ],
                        }}
                    >
                        <Animated.Code>{this.renderColorAnim}</Animated.Code>
                        {this.props.leftIcon(this.state.iconColor)}
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ translateX: this.animState.position }],
                            flexDirection: 'row',
                        }}
                    >
                        <Animated.Code>{this.renderRowSpringAnim}</Animated.Code>
                        {children}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

export default SwipeableItem;
