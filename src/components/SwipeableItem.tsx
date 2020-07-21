import React from 'react';
import { View } from 'react-native';
import { windowWidth } from '../shared/constants';
import { Text } from '@ui-kitten/components';
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
        stiffness: 50,
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

                    cond(
                        //resets clock and sets state to finished on swipe if clock was running before
                        and(eq(state, GestureState.ACTIVE), clockRunning(this.clock)),
                        stopClock(this.clock),
                        set(this.animState.finished, 0),
                    ),
                    cond(
                        and(
                            eq(state, GestureState.END),
                            greaterThan(
                                this.animState.position,
                                this.props.swipeThreshold,
                            ),
                        ),
                        call([this.animState.position], () => {
                            return this.props.onSwipe(this.props.item);
                        }),
                        //elseif
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

    onGestureEvent = event([
        {
            nativeEvent: ({ translationX }) =>
                block([
                    cond(eq(this.gestureState, GestureState.ACTIVE), [
                        set(this.animState.position, translationX),
                    ]),
                ]),
        },
    ]);

    render() {
        const { children } = this.props;
        return (
            <PanGestureHandler
                activeOffsetX={10}
                onGestureEvent={this.onGestureEvent}
                onHandlerStateChange={this.onHandlerStateChange}
            >
                <Animated.View
                    style={{
                        flex: 1,
                        transform: [{ translateX: this.animState.position }],
                        flexDirection: 'row',
                        // width: windowWidth,
                        // position: 'absolute',
                        // top: 0,
                        // right: 0,
                        // bottom: 0,
                        // left: 0,
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
                    <Animated.View
                        style={{
                            width: 100,
                            height: 40,
                            position: 'absolute',
                            left: -100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'red',
                        }}
                    >
                        <Text>Delete</Text>
                    </Animated.View>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        );
    }
}

export default SwipeRow;
