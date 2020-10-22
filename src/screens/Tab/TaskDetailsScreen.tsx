import React, { useState, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components';
import { Layout, Text, Button } from '@ui-kitten/components';
import { backAction } from '../../shared/components/UI_Actions';
import { Entypo } from '@expo/vector-icons';
import { CustomAnimatedModal } from '../../components/CustomAnimatedModal';
import { resetSwapConfig } from '../../store/actions/swapActions';
import { SwapStateActions } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RequestSwapStack } from '../../navigation/RequestSwap/RequestSwapStack';
import { retrieveSwapCandidates, setMyTask } from '../../store/actions/swapActions';

export const TaskDetailsScreen = (props) => {
    const { task } = props.route.params;
    const { myTask } = useSelector((state) => state.swapReducer);
    let layoutHeight = useRef(0);
    const dispatch = useDispatch();

    const dotColor = 'green';

    // const closeModalHandler = () => {
    //     dispatch(SwapStateActions.DefaultState()); //do i still need this ?
    //     dispatch(resetSwapConfig());
    // };

    const onButtonPressHandler = () => {
        dispatch(retrieveSwapCandidates(task.church.churchId, task.roleId, task.userId));
        if (myTask === null || myTask.taskId !== task.taskId) dispatch(setMyTask(task));
        props.navigation.navigate('SelectSwapOption');
    };

    return (
        <Layout
            style={{ flex: 1, width: '100%', padding: 30 }}
            onLayout={(e) => (layoutHeight.current = e.nativeEvent.layout.height)}
        >
            <Text category="h1">{task.role.name}</Text>
            <Text>{task.date}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="dot-single" size={40} color={dotColor} />
                <Text>Currently scheduled</Text>
            </View>
            <Text>if change is requested, show here</Text>
            <Button onPress={onButtonPressHandler}>Request Change</Button>
        </Layout>
    );
};
