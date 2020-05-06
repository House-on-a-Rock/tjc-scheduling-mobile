export const CREATE_CALENDAR = 'CREATE_CALENDAR';
export const EXTEND_CALENDAR = 'EXTEND_CALENDAR';

export const createCalendar = () => {
	return {
		type: CREATE_CALENDAR,
	};
};

export const extendCalendar = (direction) => {
	return {
		type: EXTEND_CALENDAR,
		payload: direction,
	};
};
