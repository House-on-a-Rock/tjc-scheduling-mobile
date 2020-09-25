import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Layout, Card } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { Calendar } from './Calendar';
import { calendarCardDimensions } from '../../shared/constants/';
import { calendarRange } from '../../shared/constants/';

export const ScrollCalendar = () => {
    const data: Date[] = useSelector(({ calendarReducer }) => calendarReducer.dateArray);

    const renderMonths = ({ item, index }) => {
        return (
            <Card
                appearance="filled"
                style={{
                    width: '100%',
                    height: calendarCardDimensions.height,
                    marginBottom: calendarCardDimensions.margin,
                }}
                activeOpacity={1}
            >
                <Calendar
                    displayedMonth={item}
                    // onTilePress={tilePressHandler}
                    // type="calendarReducer"
                    cardIndex={index}
                />
            </Card>
        );
    };

    return (
        <Layout>
            <FlatList
                // ref={carouselRef}
                data={data}
                keyExtractor={(item, index) => `${item.toString()}-${index}`}
                renderItem={renderMonths}
                // onRefresh={loadMoreOnTop}
                // refreshing={isRefreshing}
                // onEndReachedThreshold={0.1}
                // onEndReached={loadMoreOnBottom}
                initialScrollIndex={calendarRange}
                initialNumToRender={calendarRange}
                snapToAlignment={'start'}
                decelerationRate={'normal'}
                windowSize={12}
                getItemLayout={(data, index) => {
                    return {
                        length: calendarCardDimensions.totalHeight,
                        offset: calendarCardDimensions.totalHeight * index,
                        index,
                    };
                }}
            />
        </Layout>
    );
};
