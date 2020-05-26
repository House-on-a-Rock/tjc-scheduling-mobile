export const months = (leap = false) => ({
    0: { name: 'January', days: 31 },
    1: { name: 'February', days: leap ? 29 : 28 },
    2: { name: 'March', days: 31 },
    3: { name: 'April', days: 30 },
    4: { name: 'May', days: 31 },
    5: { name: 'June', days: 30 },
    6: { name: 'July', days: 31 },
    7: { name: 'August', days: 31 },
    8: { name: 'September', days: 30 },
    9: { name: 'October', days: 31 },
    10: { name: 'November', days: 30 },
    11: { name: 'December', days: 31 },
});

// export enum Months {
//     January = 31,
//     February = 29 | 28,
//     March = 31,
//     April = 30,
//     May = 31,
//     June = 30,
//     July = 31,
//     August = 31,
//     September = 30,
//     October = 31,
//     November = 30,
//     December = 30,
// }
