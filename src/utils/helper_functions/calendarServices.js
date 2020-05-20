import { FORWARD, BACKWARD } from '../models/calendar';
import { useSelector } from 'react-redux';

export const setFirstDay = (displayedDate) => {
    const tempDisplayedDay = displayedDate.getDay();
    const tempDisplayedDate = displayedDate.getDate();
    const a = tempDisplayedDay + 1 - (tempDisplayedDate % 7);
    if (a >= 0) {
        return a;
    } else {
        return a + 7;
    }
};

export const getUpdatedMonth = (direction, displayedDate) => {
    let year = displayedDate.getFullYear();
    let nextMonth = displayedDate.getMonth();

    if (direction === FORWARD) {
        nextMonth = displayedDate.getMonth() + 1 > 11 ? 0 : displayedDate.getMonth() + 1;
        if (nextMonth === 0) {
            year = displayedDate.getFullYear() + 1;
        }
        return new Date(year, nextMonth, 1);
    } else {
        nextMonth = displayedDate.getMonth() - 1 < 0 ? 11 : displayedDate.getMonth() - 1;
        if (nextMonth === 11) {
            year = displayedDate.getFullYear() - 1;
        }
        return new Date(year, nextMonth, 1);
    }
};

const getXMonths = (dateFrom, number) => {
    let newArray = [];
    let forwardBool = true;
    if (number < 0) {
        number = Math.abs(number);
        forwardBool = false;
    }
    if (forwardBool) {
        newArray.push(getUpdatedMonth(FORWARD, dateFrom));
        for (let i = 1; i < number; i++) {
            newArray.push(getUpdatedMonth(FORWARD, newArray[i - 1]));
        }
        return newArray;
    } else {
        newArray.push(getUpdatedMonth(BACKWARD, dateFrom));
        for (let i = 1; i < number; i++) {
            newArray.push(getUpdatedMonth(BACKWARD, newArray[i - 1]));
        }
        return newArray.reverse();
    }
};

export const createDateArray = (tasks = []) => {
    // const today = new Date();
    // const dateArray = getXMonths(today, -2).concat([today].concat(getXMonths(today, 2)));
    // const dateObjectArray = dateArray.map((date, index) => {
    // 	return {
    // 		id: index,
    // 		date: date,
    // 	};
    // });
    // return dateObjectArray;

    //map tasks over dateArray

    const dateArray = [];
    for (let i = 2000; i < 2022; i++) {
        for (let j = 0; j < 12; j++) {
            dateArray.push({
                id: dateArray.length,
                date: new Date(i, j, 1),
                //array of task indices
            });
        }
    }
    return dateArray;
};

export const extendDateArray = (direction, dateArray) => {
    if (direction === FORWARD) {
        const lastMonth = dateArray[dateArray.length - 1].date;
        const newMonthsArray = getXMonths(lastMonth, 3);
        const extensionArray = newMonthsArray.map((date, index) => {
            return {
                id: index,
                date: date,
            };
        });
        return dateArray.concat(extensionArray);
    } else {
        const firstMonth = dateArray[0].date;
        const newMonthsArray = getXMonths(firstMonth, -3);
        const extensionArray = newMonthsArray.map((date, index) => {
            return {
                id: index,
                date: date,
            };
        });

        return extensionArray.concat(dateArray);
    }
};
