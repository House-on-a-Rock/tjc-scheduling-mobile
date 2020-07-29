import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';
import { Layout } from '@ui-kitten/components';
import { calendarCardDimensions } from '../../shared/constants/';
import { TaskData } from '../../shared/models';
import { calendarRange } from '../../shared/constants/';

//prevents rerendering on show TaskPreviewPane
export const Carousel = React.memo(
    () => {
        const dispatch = useDispatch();
        const carouselRef = useRef(null);

        //extends date array
        const isRefreshing: boolean = useSelector(
            ({ calendarReducer }) => calendarReducer.isRefreshing,
        );
        const loadMoreOnBottom = () => dispatch(extendCalendar(CarousalDirection.DOWN));
        const loadMoreOnTop = () => dispatch(extendCalendar(CarousalDirection.UP));

        const data: Date[] = useSelector(
            ({ calendarReducer }) => calendarReducer.dateArray,
        );
        const tasks: TaskData[] = useSelector((state) => state.taskReducer.tasks);

        //distributes tasks to appropriate calendar month
        const filterTasks = (monthItem) =>
            tasks.filter((task) => {
                //https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
                const taskDate = new Date(task.date.replace(/-/g, '/')); //replacing '-' with '/' returns the correct date consistently
                return (
                    taskDate.getMonth() === monthItem.getMonth() &&
                    taskDate.getFullYear() === monthItem.getFullYear()
                );
            });

        const onPressScrollHandler = (index) =>
            carouselRef.current.scrollToIndex({ index: index, animated: true });

        const renderMonths = ({ item, index }) => {
            return (
                <CalendarCard
                    cardIndex={index}
                    displayedDate={item}
                    tasks={filterTasks(item)}
                    onPressScroll={onPressScrollHandler}
                />
            );
        };

        return (
            <Layout>
                <FlatList
                    ref={carouselRef}
                    data={data}
                    keyExtractor={(item, index) => `${item.toString()}-${index}`}
                    renderItem={renderMonths}
                    onRefresh={loadMoreOnTop}
                    refreshing={isRefreshing}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadMoreOnBottom}
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
    },
    () => true,
);
