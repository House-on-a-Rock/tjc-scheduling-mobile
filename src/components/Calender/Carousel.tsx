import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CalendarCard } from './CalendarCard';
import { useSelector } from 'react-redux';

interface CarouselProps {}

export const Carousel = (props) => {
    // console.log('Carousel', props);
    const { viewWidth } = props;
    // const dispatch = useDispatch();
    const items = useSelector((state) => state.calendarReducer.dateArray);

    //<dummy wrapper>
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
    //</dummy wrapper>

    const navigation = useNavigation();

    const renderMonths = (item) => (
        <CalendarCard displayedDate={item.item.date} style={{ width: viewWidth }} />
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
                initialScrollIndex={3}
                initialNumToRender={7}
                getItemLayout={(data, index) => ({
                    length: viewWidth,
                    index,
                    offset: viewWidth * index,
                })}
                windowSize={7}
            />
        </View>
    );
};
