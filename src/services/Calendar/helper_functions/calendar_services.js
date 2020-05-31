import { CarousalDirection } from '../models';

export const setFirstDay = (displayedDate) => {
    const tempDisplayedDay = displayedDate.getDay();
    const tempDisplayedDate = displayedDate.getDate();
    const a = tempDisplayedDay + 1 - (tempDisplayedDate % 7);
    return a >= 0 ? a : a + 7;
};

export const getUpdatedMonth = (carousalDirection, displayedDate) => {
    let year = displayedDate.getFullYear();
    let nextMonth = displayedDate.getMonth();

    if (carousalDirection === CarousalDirection.FORWARD) {
        nextMonth = displayedDate.getMonth() + 1 > 11 ? 0 : displayedDate.getMonth() + 1;
        if (nextMonth === 0) year = displayedDate.getFullYear() + 1;
        return new Date(year, nextMonth, 1);
    } else {
        nextMonth = displayedDate.getMonth() - 1 < 0 ? 11 : displayedDate.getMonth() - 1;
        if (nextMonth === 11) year = displayedDate.getFullYear() - 1;
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
        newArray.push(getUpdatedMonth(CarousalDirection.FORWARD, dateFrom));
        for (let i = 1; i < number; i++) {
            newArray.push(getUpdatedMonth(CarousalDirection.FORWARD, newArray[i - 1]));
        }
        return newArray;
    } else {
        newArray.push(getUpdatedMonth(CarousalDirection.BACKWARD, dateFrom));
        for (let i = 1; i < number; i++) {
            newArray.push(getUpdatedMonth(CarousalDirection.BACKWARD, newArray[i - 1]));
        }
        return newArray.reverse();
    }
};

export const extendDateArray = (direction, dateArray) => {
    if (direction === CarousalDirection.FORWARD) {
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
    if (direction === CarousalDirection.UP) {
        console.log('extendDateArray!!!!!!!', dateArray);
    }
};

export const createDateArray = (startMonth, endMonth) => {
    const dateArray = [];

    dateArray.push({ id: dateArray.length, date: startMonth });
    while (!compareDates(dateArray[dateArray.length - 1].date, endMonth)) {
        const nextMonth = getUpdatedMonth(
            CarousalDirection.FORWARD,
            dateArray[dateArray.length - 1].date,
        );
        dateArray.push({ id: dateArray.length, date: nextMonth });
    }

    return dateArray;
};

export const compareDates = (date1, date2) =>
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getDate() === date2.getDate();
