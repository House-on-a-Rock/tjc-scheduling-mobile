import React from 'react';
import { View, FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useSelector } from 'react-redux';

interface CarouselProps {}

export const Carousel = (props) => {
    const renderMonths = (item) => <CalendarCard displayedDate={item.item.date} />;

    return (
        <View>
            <FlatList
                data={props.items}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderMonths}
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
