import { months } from '../Calendar/models';

export const useStringDate = (date) => {
    const isLeap = date.getFullYear() % 4 === 0 ? true : false;
    const year = date.getFullYear();
    const month = date.getMonth();
    return [isLeap, year, month];
};
