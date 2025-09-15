import {type AuthState } from './auth.state';

export const initialStateAuth: AuthState = {
	token: '',
	user: {
		id: '',
		workerId: '',
		email: '',
		name: '',
		role: '',
	},
};
