import React from 'react';
import { FlatList } from 'react-native';
import { CalendarCard } from './CalendarCard';
import { useDispatch, useSelector } from 'react-redux';
import { extendCalendar } from '../../store/actions/calendarActions';
import { CarousalDirection } from '../../services/Calendar/models';
import { Layout } from '@ui-kitten/components';
import { calendarCardDimensions } from '../../shared/constants/';
import { TaskData } from '../../shared/models';

export const Carousel = () => {
    const dispatch = useDispatch();

    //extends date array
    const isRefreshing: boolean = useSelector(
        ({ calendarReducer }) => calendarReducer.isRefreshing,
    );
    const loadMoreOnBottom = () => dispatch(extendCalendar(CarousalDirection.DOWN));
    const loadMoreOnTop = () => dispatch(extendCalendar(CarousalDirection.UP));

    const data: Date[] = useSelector(({ calendarReducer }) => calendarReducer.dateArray);
    const tasks: TaskData[] = useSelector((state) => state.taskReducer.tasks);

    //distributes tasks to appropriate calendar month
    const filterTasks = (monthItem) =>
        tasks.filter((task) => {
            //https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
            const taskDate = new Date(task.date.replace(/-/g, '/')); //replacing - with / returns the correct date consistently
            return (
                taskDate.getMonth() === monthItem.getMonth() &&
                taskDate.getFullYear() === monthItem.getFullYear()
            );
        });

    const renderMonths = ({ item }) => {
        return <CalendarCard displayedDate={item} tasks={filterTasks(item)} />;
    };

    return (
        <Layout>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMonths}
                onRefresh={loadMoreOnTop}
                refreshing={isRefreshing}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreOnBottom}
                initialScrollIndex={6}
                initialNumToRender={6}
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
