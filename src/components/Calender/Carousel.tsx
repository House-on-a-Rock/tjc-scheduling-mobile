import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';

interface CarouselProps {
    data: Date;
}

export const Carousel = (props) => {
    console.log('Carousel', props);
    const renderMonths = ({ item }) => <CalendarCard displayedDate={item} />;
    const loadMoreOnBottom = () => dispatch(extendCalendar(CarousalDirection.DOWN));
    const loadMoreOnTop = () => dispatch(extendCalendar(CarousalDirection.UP));

    const dispatch = useDispatch();
    const refresh: boolean = useSelector(
        ({ calendarReducer }) => calendarReducer.data.isRefreshing,
    );

    return (
        <View>
            <FlatList
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMonths}
                onRefresh={loadMoreOnTop}
                refreshing={refresh}
                onEndReachedThreshold={0.8}
                onEndReached={loadMoreOnBottom}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={12}
                initialNumToRender={7}
                snapToAlignment={'start'}
                snapToInterval={400} //400 is height of calendar card
                decelerationRate={'fast'}
                windowSize={7}
                getItemLayout={(data, index) => {
                    return {
                        length: 400,
                        offset: 400 * index,
                        index,
                    };
                }}
            />
        </View>
    );
};
