import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import { dateTileDimensions } from '../../shared/constants';

interface DateTileProps {
    isToday: boolean;
    isCurrentMonth: boolean;
    data: Object[];
    renderedDate: Date;
}

export const DateTile = React.memo((props: DateTileProps) => {
    const { isToday, renderedDate, isCurrentMonth, data } = props;
    const navigation = useNavigation();
    let month = renderedDate.getMonth() + 1; //getMonth() returns in base 0
    let year = renderedDate.getFullYear();
    let date = renderedDate.getDate();

    if (!isCurrentMonth) {
        return <Layout style={styles.tile}></Layout>;
    }

    return (
        <Layout style={styles.tile}>
            <TouchableOpacity
                style={
                    isToday
                        ? {
                              ...styles.touchable,
                              backgroundColor: 'rgba(246, 84, 84, 0.36)',
                              //   margin: 3,
                              borderRadius: 15,
                              overflow: 'hidden',
                          }
                        : styles.touchable
                }
                onPress={() =>
                    navigation.navigate('Tasks', {
                        name: `${month}/${date}/${year}`,
                        taskDetails: data,
                    })
                }
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Text category="p1" status="success" style={{ color: '#5999E2' }}>
                        {date}
                    </Text>
                    {data.length > 0 ? (
                        <Entypo name="dot-single" size={20} color="black" />
                    ) : (
                        <View></View>
                    )}
                </View>
            </TouchableOpacity>
        </Layout>
    );
});

const styles = StyleSheet.create({
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#B3A6A6',
    },
    touchable: {
        flex: 1,
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
