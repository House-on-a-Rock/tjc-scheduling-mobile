import { CarousalDirection } from '../models';

export const setFirstDay = (displayedDate: Date): number => {
    const tempDisplayedDay = displayedDate.getDay();
    const tempDisplayedDate = displayedDate.getDate();
    const a = tempDisplayedDay + 1 - (tempDisplayedDate % 7);
    return a >= 0 ? a : a + 7;
};

export const getUpdatedMonth = (carousalDirection, displayedDate) => {
    let year = displayedDate.getFullYear();
    let nextMonth = displayedDate.getMonth();

    if (carousalDirection === CarousalDirection.DOWN) {
        nextMonth = displayedDate.getMonth() + 1 > 11 ? 0 : displayedDate.getMonth() + 1;
        if (nextMonth === 0) year = displayedDate.getFullYear() + 1;
        return new Date(year, nextMonth, 1);
    } else if (carousalDirection === CarousalDirection.UP) {
        nextMonth = displayedDate.getMonth() - 1 < 0 ? 11 : displayedDate.getMonth() - 1;
        if (nextMonth === 11) year = displayedDate.getFullYear() - 1;
        return new Date(year, nextMonth, 1);
    }
};

// export const getXMonths = (dateFrom, number) => {
//     let newArray = [];
//     let forwardBool = true;
//     if (number < 0) {
//         number = Math.abs(number);
//         forwardBool = false;
//     }
//     if (forwardBool) {
//         newArray.push(getUpdatedMonth(CarousalDirection.FORWARD, dateFrom));
//         for (let i = 1; i < number; i++) {
//             newArray.push(getUpdatedMonth(CarousalDirection.FORWARD, newArray[i - 1]));
//         }
//         return newArray;
//     } else {
//         newArray.push(getUpdatedMonth(CarousalDirection.BACKWARD, dateFrom));
//         for (let i = 1; i < number; i++) {
//             newArray.push(getUpdatedMonth(CarousalDirection.BACKWARD, newArray[i - 1]));
//         }
//         return newArray.reverse();
//     }
// };

export const extendDateArray = ({ direction, range }, { dateArray }) => {
    if (direction === CarousalDirection.UP) {
        while (range > 0) {
            range--;
            let start = dateArray[0];
            let previous = getUpdatedMonth(CarousalDirection.UP, start);
            dateArray.unshift(previous);
        }
        return dateArray;
    } else if (direction === CarousalDirection.DOWN) {
        while (range > 0) {
            range--;
            let last = dateArray[dateArray.length - 1];
            let next = getUpdatedMonth(CarousalDirection.DOWN, last);
            dateArray.push(next);
        }
        return dateArray;
    }
};
export const createDateArray = (start, end) => {
    const dateArray = [];
    dateArray.push(start);
    while (!compareDates(dateArray[dateArray.length - 1], end)) {
        const nextMonth = getUpdatedMonth(
            CarousalDirection.DOWN,
            dateArray[dateArray.length - 1],
        );
        dateArray.push(nextMonth);
    }

    return dateArray;
};

export const compareDates = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate()
    );
};
