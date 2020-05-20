import React, { useState, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions';
import { FORWARD, BACKWARD } from '../../utils/models/calendar';

export const Carousel = (props) => {
    const { viewWidth } = props;
    const dispatch = useDispatch();
    const items = useSelector((state) => state.calendarReducer.dateArray);

    // const [viewedIndices, setViewedIndices] = useState({
    // 	currentIndex: 2,
    // 	previousIndex: 2,
    // });

    // const flatListRef = React.useRef(null);

    // const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    // const onViewRef = useRef(({ viewableItems, changed }) => {
    // 	const vIndex = viewableItems[0].index;

    // 	const prevIndex = changed[1] ? changed[1].index : 1;
    // 	return setViewedIndices({
    // 		currentIndex: vIndex,
    // 		previousIndex: prevIndex,
    // 	});
    // });
    // let onStartThresholdIndex = 1;
    // const onScrollHandler = () => {
    // 	const { currentIndex, previousIndex } = viewedIndices;

    // 	if (previousIndex < currentIndex && currentIndex === items.length - 3) {
    // 		dispatch(extendCalendar(FORWARD));
    // 	}
    // 	if (previousIndex > currentIndex && currentIndex === 2) {
    // 		dispatch(extendCalendar(BACKWARD));
    // 		flatListRef.current.scrollToIndex({
    // 			index: currentIndex + 5,
    // 			animated: false,
    // 		});
    // 	}
    // };

    const navigation = useNavigation();

    const renderMonths = (item) => (
        <CalendarCard
            displayedDate={item.item.date}
            style={{ width: viewWidth }}
            onPress={() => navigation.navigate('Tasks')}
        />
    );

    const calculateInitialScrollIndex = () => {
        const today = new Date();
        return (today.getFullYear() - 2000) * 12 + today.getMonth();
        // const flatListRef = React.useRef(null);
        // const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    };

    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderMonths}
                // ref={flatListRef}
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={calculateInitialScrollIndex()}
                initialNumToRender={7}
                getItemLayout={(data, index) => ({
                    length: viewWidth,
                    index,
                    offset: viewWidth * index,
                })}
                windowSize={7}
                // onViewableItemsChanged={onViewRef.current}
                // viewabilityConfig={viewConfigRef.current}
                // onScroll={onScrollHandler}
                // scrollEventThrottle={700}
                // maintainVisibleContentPosition={{
                // 	minIndexForVisible: 1,
                // }}
            />
        </View>
    );
};
