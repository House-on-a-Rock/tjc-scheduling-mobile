import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';

interface CarouselProps {}

export const Carousel = (props) => {
    const renderMonths = (item) => {
        return <CalendarCard displayedDate={item.item.date} />;
    };
    // const calCardDatesArray = useSelector(({ calendarReducer }) => {
    //     calendarReducer.dspata.dataArray;
    // });

    return (
        <View>
            <FlatList
                data={props.items}
                keyExtractor={(item, index) => {
                    // console.log('keyExtractor', item, index);
                    return item.id.toString();
                }}
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

// const loadMoreOnBottom = () => {
//     // console.log('loading more');
//     // dispatch api to load more data
// };

// const dispatch = useDispatch();

// const [refresh, setRefresh] = useState(false); // will use reducer logic

// onScroll={(e) => {
//     console.log(e.nativeEvent.contentOffset.y, e.nativeEvent.contentSize.height)
//     // this.pageOffsetY = e.nativeEvent.contentOffset.y;
//     // this.contentHeight = e.nativeEvent.contentSize.height;
//     return null;
// }}
// onRefresh={() => {
//     // console.log('pulled down');
//     // dispatch action for more data
//     dispatch(extendCalendar(CarousalDirection.UP));
//     setRefresh(false);
// }}
// refreshing={refresh}
// onEndReachedThreshold={3}
// onEndReached={loadMoreOnBottom}
