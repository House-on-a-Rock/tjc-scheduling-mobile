import { FORWARD, BACKWARD } from '../../../utils/models/calendar';
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

export const getXMonths = (dateFrom, number) => {
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

export const createDateArray = (startMonth, endMonth) => {
    const dateArray = [];

    dateArray.push({ id: dateArray.length, date: startMonth });
    while (dateArray[dateArray.length - 1].date.getMonth() !== endMonth.getMonth()) {
        const nextMonth = getUpdatedMonth(FORWARD, dateArray[dateArray.length - 1].date);
        dateArray.push({ id: dateArray.length, date: nextMonth });
    }

    return dateArray;

    // for (let i = 2000; i < 2022; i++) {
    //     for (let j = 0; j < 12; j++) {
    //         dateArray.push({
    //             id: dateArray.length,
    //             date: new Date(i, j, 1),
    //             //array of task indices
    //         });
    //     }
    // }
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

export const compareDates = (date1, date2) =>
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate();
