import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { Layout } from '@ui-kitten/components';

const profilePic = require('../../assets/images/JleeProfilePic.jpg');

interface DashboardProps {
    navigation;
}

export const DashboardScreen = (props: DashboardProps) => {
    //data needed
    const { tasks } = useSelector((state) => state.taskReducer);

    const renderTasks = ({ item }) => {
        const dateTimeFormat = new Intl.DateTimeFormat('en', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
        const [
            { value: year },
            { value: month },
            { value: day },
        ] = dateTimeFormat.formatToParts(new Date(item.date));

        //date is displayed incorrectly but i'll get it when i have real data
        return (
            <View style={styles.displayCard}>
                <Text>{`${day}-${month}-${year}`}</Text>
                <Text>{item.role.name}</Text>
                <Text>{item.church.name}</Text>
            </View>
        );
    };

    return (
        <Layout
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <View style={styles.nameCard}>
                <View style={styles.imageContainer}>
                    <Image source={profilePic} style={styles.image} />
                </View>
                <Text>Name</Text>
                <Text>List of Holy Works</Text>
            </View>
            <View style={styles.scrollContainer}>
                <Text>Upcoming Assignments</Text>
                <FlatList
                    data={tasks}
                    renderItem={renderTasks}
                    horizontal={true}
                    keyExtractor={(item, index) => item.taskId + index}
                />
            </View>
            <View style={styles.scrollContainer}>
                <Text>Requests</Text>
            </View>
            <View style={styles.miscContainer}>
                <Text>Miscellaneous, any ideas what to display here?</Text>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    nameCard: {
        width: '98%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#BCBCBC',
        padding: 5,

        //must set background color to avoid inner views from inheriting shadow props
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    scrollContainer: {
        width: '93%',
        flex: 1,
        borderWidth: 1,
        borderColor: '#BCBCBC',
        marginTop: 7,
        padding: 5,

        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    imageContainer: {
        height: 100,
        width: 100,
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    displayCard: {
        borderWidth: 1,
        borderColor: '#BCBCBC',
        width: 130,
        flex: 1,
        margin: 5,
    },
    miscContainer: {
        width: '100%',
        flex: 1,
    },
});
