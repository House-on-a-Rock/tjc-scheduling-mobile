import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import { dateTileDimensions } from '../../shared/constants';
import { compareDates } from '../../services/Calendar/helper_functions/calendar_services';

interface DateTileProps {
    isToday: boolean;
    isCurrentMonth: boolean;
    data: Object[];
    day: Date;
    isSelected?: boolean;
    handlePress: (day, data, cardIndex) => void;
    cardIndex: number;
}

export const DateTile = React.memo((props: DateTileProps) => {
    const {
        isToday,
        day,
        isCurrentMonth,
        data,
        isSelected,
        handlePress,
        cardIndex,
    } = props;

    let date = day.getDate();

    if (!isCurrentMonth) {
        return <Layout style={styles.tile}></Layout>;
    }

    return (
        <Layout style={styles.tile}>
            <TouchableOpacity
                style={isSelected ? styles.selected : styles.touchable}
                onPress={() => handlePress(day, data, cardIndex)}
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Text
                        category="p1"
                        status="success"
                        style={{ color: isToday ? 'red' : '#5999E2' }}
                    >
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
}, areEqual);

function areEqual(prevProps, nextProps): boolean {
    //true will not rerender
    return (
        prevProps.isSelected === nextProps.isSelected &&
        compareDates(prevProps.day, nextProps.day)
    );
}

const styles = StyleSheet.create({
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        flex: 1,
        width: '100%',
    },
    selected: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(246, 84, 84, 0.36)',
        borderRadius: 15,
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
});
