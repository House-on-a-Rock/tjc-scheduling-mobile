import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';
import { Layout } from '@ui-kitten/components';

interface CarouselProps {
    data: Date[];
}

export const Carousel = (props: CarouselProps) => {
    const dispatch = useDispatch();
    const isRefreshing: boolean = useSelector(
        ({ calendarReducer }) => calendarReducer.isRefreshing,
    );

    const renderMonths = ({ item }) => <CalendarCard displayedDate={item} />;

    // functions
    const loadMoreOnBottom = () => dispatch(extendCalendar(CarousalDirection.DOWN));
    const loadMoreOnTop = () => dispatch(extendCalendar(CarousalDirection.UP));

    return (
        <Layout>
            <FlatList
                data={props.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMonths}
                onRefresh={loadMoreOnTop}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreOnBottom}
                initialScrollIndex={12}
                initialNumToRender={12}
                snapToAlignment={'start'}
                decelerationRate={'normal'}
                windowSize={24}
                getItemLayout={(data, index) => {
                    return {
                        length: 400,
                        offset: 400 * index,
                        index,
                    };
                }}
            />
        </Layout>
    );
};
