import React from 'react';
import { View } from 'react-native';
//https://medium.com/async-la/swipe-to-delete-with-reanimated-react-native-gesture-handler-bd7d66085aee
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
const {
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
} = Animated;

class SwipeRow extends React.Component {
    clock = new Clock();
    gestureState = new Value(GestureState.UNDETERMINED);
    animState = {
        finished: new Value(0),
        position: new Value(0),
        velocity: new Value(0),
        time: new Value(0),
    };

    // Spring animation config
    // Determines how "springy" row is when it snaps back into place after released
    animConfig = {
        toValue: new Value(0),
        damping: 15,
        mass: 0.3,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 0.2,
        restDisplacementThreshold: 0.2,
    };

    // Called whenever gesture state changes. (User begins/ends pan,
    // or if the gesture is cancelled/fails for some reason)
    onHandlerStateChange = event([
        {
            nativeEvent: ({ state }) => {
                return block([
                    // Update our animated value that tracks gesture state
                    set(this.gestureState, state),
                    // Spring row back into place when user lifts their finger before reaching threshold
                    cond(
                        and(
                            greaterThan(
                                this.animState.position,
                                this.props.swipeThreshold,
                            ),
                            eq(state, GestureState.END),
                        ),
                        [
                            call([this.animState.position], () => {
                                return this.props.onSwipe(this.props.item);
                            }),
                        ],
                    ),
                    cond(
                        and(eq(state, GestureState.END), not(clockRunning(this.clock))),
                        [startClock(this.clock)],
                    ),
                ]);
            },
        },
    ]);

    onPanEvent = event([
        {
            nativeEvent: ({ translationX }) =>
                block([
                    cond(eq(this.gestureState, GestureState.ACTIVE), [
                        // Update our translate animated value as the user pans
                        set(this.animState.position, translationX),
                    ]),
                ]),
        },
    ]);

    render() {
        const { children } = this.props;
        return (
            <PanGestureHandler
                activeOffsetX={1}
                failOffsetX={-100}
                onGestureEvent={this.onPanEvent}
                onHandlerStateChange={this.onHandlerStateChange}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ translateX: this.animState.position }],
                    }}
                >
                    <Animated.Code>
                        {() =>
                            block([
                                // If the clock is running, increment position in next tick by calling spring()
                                cond(clockRunning(this.clock), [
                                    spring(this.clock, this.animState, this.animConfig),
                                    // Stop and reset clock when spring is complete
                                    cond(this.animState.finished, [
                                        stopClock(this.clock),
                                        set(this.animState.finished, 0),
                                    ]),
                                ]),
                            ])
                        }
                    </Animated.Code>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

export default SwipeRow;
