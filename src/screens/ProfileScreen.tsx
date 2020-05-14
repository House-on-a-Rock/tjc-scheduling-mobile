import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Modal,
    Alert,
    Button,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

export const ProfileScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { email, firstName, lastName } = useSelector(
        (state) => state.profileReducer.profile,
    );
    const church = useSelector((state) => {
        if (state.profileReducer.profile && state.profileReducer.profile.church) {
            return state.profileReducer.profile.church.name;
        }
    });

    const Tile = (props) => {
        return (
            <View style={styles.tile}>
                <View style={{ width: 70 }}>
                    <Text style={styles.text}>{props.label}:</Text>
                </View>
                <View style={{ flex: 10, paddingLeft: 10 }}>
                    <Text style={styles.text}>{props.data}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Entypo
                        name="edit"
                        size={20}
                        color="black"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>
        );
    };

    const profileDetailsArray = [
        {
            label: 'Name',
            data: firstName + ' ' + lastName,
        },
        {
            label: 'Email',
            data: email,
        },
        {
            label: 'Church',
            data: church,
        },
    ];

    const render = (item) => {
        return <Tile label={item.item.label} data={item.item.data} />;
    };

    return (
        <View style={styles.screen}>
            <Modal
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}
                onRequestClose={() => Alert.alert('modal has been closed')}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => {
                        console.log('modal container pressed');
                        setModalVisible(false);
                    }}
                    activeOpacity={0}
                >
                    <View style={styles.modalCard}>
                        <Text>Modal Text</Text>
                        <Button
                            title={'Close modal'}
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styles.imageCard}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/JleeProfilePic.jpg')}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={{ paddingTop: 5 }}>
                    <Entypo
                        name="edit"
                        size={16}
                        color="black"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    keyExtractor={(item, index) => index}
                    data={profileDetailsArray}
                    renderItem={render}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: -1,
    },
    imageCard: {
        width: '100%',
        // height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        elevation: 10,
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 100,
        backgroundColor: 'red',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileCard: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
    },
    tile: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',

        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 10,
        zIndex: 999,
    },
    tileTextContainer: {
        // justifyContent:
    },
    listContainer: {
        width: '80%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        height: '30%',
        width: '70%',
        backgroundColor: 'white',
        elevation: 10,
    },
});
