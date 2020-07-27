import React from 'react';
import { Icon, Text } from '@ui-kitten/components';
//https://medium.com/async-la/swipe-to-delete-with-reanimated-react-native-gesture-handler-bd7d66085aee
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
// import { windowWidth } from '../shared/constants/';
const {
    multiply,
    min,
    add,
    divide,
    event,
    cond,
    Value,
    block,
    set,
    eq,
    not,
    clockRunning,
    and,
    startClock,
    stopClock,
    spring,
    greaterThan,
    lessThan,
    call,
    Clock,
    color,
} = Animated;

interface SwipeRowProps {
    swipeThreshold: number;
    onSwipe: (taskId: number) => void;
    itemId: number;
    children?;
}

class SwipeRow extends React.Component<SwipeRowProps> {
    clock = new Clock();
    gestureState = new Value(GestureState.UNDETERMINED);

    //main animState
    animState = {
        finished: new Animated.Value(0),
        position: new Value(0),
        velocity: new Value(0),
        time: new Value(0),

        //0 is false, 1 is true
        shouldDelete: new Value(0),
    };
    //left icon anim state
    iconAnimState = {
        finished: new Value(0),
        position: new Value(0),
        velocity: new Value(0),
        time: new Value(0),

        scaling: new Value(0),
        colorRange: new Value(0),
        colorVisible: new Value(0),
    };

    // Spring animation config
    // Determines how "springy" row is when it snaps back into place after released
    animConfig = {
        toValue: new Value(0),
        damping: 25,
        mass: 0.6,
        stiffness: 70,
        overshootClamping: true,
        restSpeedThreshold: 0.2,
        restDisplacementThreshold: 0.2,
    };

    //determines width of trash icon tray
    panWidth = 100;

    // Called whenever gesture state changes. (User begins/ends pan, or if the gesture is cancelled/fails for some reason)
    onHandlerStateChange = event([
        {
            nativeEvent: ({ state }) => {
                return block([
                    // Update gesture state changes
                    set(this.gestureState, state),

                    //resets clock and sets state to finished on swipe if clock was running before
                    cond(
                        and(eq(state, GestureState.ACTIVE), clockRunning(this.clock)),
                        stopClock(this.clock),
                        set(this.animState.finished, 0),
                    ),
                    //if gesture has ended and shouldDelete is 1 (truthy), then call the delete function
                    cond(
                        and(
                            eq(state, GestureState.END),
                            eq(this.animState.shouldDelete, 1),
                        ),
                        call([this.animState.position], () => {
                            return this.props.onSwipe(
                                // this.props.children.props.item.taskId,
                                this.props.itemId,
                            );
                        }),
                        //else if gesture ended but !shouldDelete, start spring animation
                        cond(
                            and(
                                eq(state, GestureState.END),
                                not(clockRunning(this.clock)),
                            ),
                            startClock(this.clock),
                        ),
                    ),
                ]);
            },
        },
    ]);

    //called during gestures
    onGestureEvent = event([
        {
            nativeEvent: ({ translationX }) =>
                block([
                    //icon scaling on drag
                    set(
                        this.iconAnimState.scaling,
                        min(add(divide(translationX, 150), 1), 2),
                    ), //150 is divisor, 2 is max scale

                    //sets position for row
                    cond(eq(this.gestureState, GestureState.ACTIVE), [
                        set(this.animState.position, translationX),
                        set(this.iconAnimState.colorRange, translationX),
                    ]),

                    //sets position for delete icon
                    cond(
                        and(
                            eq(this.gestureState, GestureState.ACTIVE),
                            lessThan(this.iconAnimState.position, this.panWidth),
                        ),
                        [
                            //position
                            set(
                                this.iconAnimState.position,
                                min(multiply(translationX, 0.5), 50),
                            ),
                        ],
                    ),
                    //if past swipe threshold, set shouldDelete to true
                    //set icon anim
                    cond(
                        and(
                            eq(this.gestureState, GestureState.ACTIVE),
                            greaterThan(translationX, this.props.swipeThreshold),
                        ),
                        [
                            set(this.animState.shouldDelete, 1),
                            set(this.iconAnimState.colorVisible, 1),
                        ],
                        [
                            set(this.animState.shouldDelete, 0),
                            set(this.iconAnimState.colorVisible, 0),
                        ],
                    ),
                ]),
        },
    ]);

    renderSpringAnim = () =>
        block([
            // If the clock is running, increment position in next tick by calling spring()
            cond(clockRunning(this.clock), [
                spring(this.clock, this.animState, this.animConfig),
                spring(this.clock, this.iconAnimState, this.animConfig),
                // Stop and reset clock when spring is complete
                cond(this.animState.finished, [
                    stopClock(this.clock),
                    set(this.animState.finished, 0),
                    set(this.iconAnimState.finished, 0),
                ]),
            ]),
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
                    <Animated.View //trash icon scaling
                        style={{
                            width: this.panWidth,
                            height: '100%',

                            position: 'absolute',
                            left: -this.panWidth,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Animated.View
                            style={{
                                transform: [
                                    { scale: this.iconAnimState.scaling },
                                    { translateX: this.iconAnimState.position },
                                ],
                                borderColor: color(
                                    255,
                                    0,
                                    0,
                                    this.iconAnimState.colorVisible,
                                ),
                                borderWidth: this.iconAnimState.colorVisible,
                                borderRadius: 20,
                            }}
                        >
                            <Icon
                                height={15}
                                width={30}
                                color="red"
                                name="trash-2-outline"
                            />
                        </Animated.View>
                    </Animated.View>
                    <Animated.View
                        style={{
                            flex: 1,
                            transform: [{ translateX: this.animState.position }],
                            flexDirection: 'row',
                        }}
                    >
                        <Animated.Code>{this.renderSpringAnim}</Animated.Code>
                        {children}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

export default SwipeRow;
