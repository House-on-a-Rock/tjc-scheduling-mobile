import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { TitleText } from '../../shared/components';

export const DateTile = (props) => {
    const { isToday, renderedDate, isCurrentMonth, data } = props;
    const navigation = useNavigation();
    let TextComponent = props.TextComponent || TitleText; //TODO redo font system
    let month = renderedDate.getMonth() + 1; //getMonth() returns in base 0
    let year = renderedDate.getFullYear();
    let date = renderedDate.getDate();

    return (
        <View style={styles.tile}>
            <TouchableOpacity
                style={
                    isToday
                        ? {
                              ...styles.touchable,
                              backgroundColor: 'rgba(246, 84, 84, 0.36)',
                              margin: 3,
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
                    <TextComponent style={{ ...styles.text, ...props.textStyle }}>
                        {date}
                    </TextComponent>
                    {data.length > 0 ? (
                        <Entypo name="dot-single" size={20} color="black" />
                    ) : (
                        <View></View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: '14.2857%',
        height: 50, //TODO extract these constants
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
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
