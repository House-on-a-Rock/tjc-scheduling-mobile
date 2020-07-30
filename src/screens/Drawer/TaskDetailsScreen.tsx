import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/';
import { Layout, Text, Button } from '@ui-kitten/components';
import { backAction } from '../../shared/components/UI_Actions';
import { Entypo } from '@expo/vector-icons';
import { CustomAnimatedModal } from '../../components/CustomAnimatedModal';
import { resetSwapConfig } from '../../store/actions/swapActions';
import { useDispatch } from 'react-redux';

export const TaskDetailsScreen = (props) => {
    const { task } = props.route.params;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    const leftAccessory = () => backAction(props.navigation.goBack);
    const rightAccessory = () => (
        <TouchableOpacity onPress={() => console.log('pressed alert me')}>
            <Text>Alert Me</Text>
        </TouchableOpacity>
    );

    const dotColor = 'green';

    const closeModalHandler = () => {
        setModalVisible(false);
        dispatch(resetSwapConfig());
    };

    return (
        <Screen accessoryLeft={leftAccessory} accessoryRight={rightAccessory}>
            <Layout style={{ flex: 1, width: '100%', padding: 30 }}>
                <Text category="h1">{task.role.name}</Text>
                <Text>{task.date}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="dot-single" size={40} color={dotColor} />
                    <Text>Currently scheduled</Text>
                </View>
                <Text>if change is requested, show here</Text>
                <Button onPress={() => setModalVisible(true)}>Request Change</Button>
                {modalVisible && (
                    <CustomAnimatedModal
                        isVisible={modalVisible}
                        closeModal={closeModalHandler}
                    />
                )}
            </Layout>
        </Screen>
    );
};
