import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Screen } from '../../components/';
import { Layout, Text, Button, Modal } from '@ui-kitten/components';
import { backAction } from '../../shared/components/UI_Actions';
import { Entypo } from '@expo/vector-icons';
import { windowWidth, windowHeight } from '../../shared/constants/';
import { RequestChangeModal } from '../RequestSwap/RequestChangeModal';
// import { RequestSwapStack } from '../../navigation/';

export const TaskDetailsScreen = (props) => {
    const { task } = props.route.params;
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const leftAccessory = () => backAction(props.navigation.goBack);
    const rightAccessory = () => (
        <TouchableOpacity onPress={() => console.log('pressed alert me')}>
            <Text>Alert Me</Text>
        </TouchableOpacity>
    );

    const dotColor = 'green';

    const closeModalHandler = () => {
        setModalVisible(false);
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
            </Layout>
            <RequestChangeModal
                modalVisible={modalVisible}
                closeModalHandler={closeModalHandler}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    modalLayout: {
        height: windowHeight * 0.8,
        width: windowWidth * 0.85,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
