export const LOGIN = 'LOGIN';

export const login = (profile) => {
	return {
		type: LOGIN,
		payload: profile,
	};
};
