import {type AuthState } from './auth.state';

export const initialStateAuth: AuthState = {
	token: '',
	user: {
		id: '',
		email: '',
		name: '',
		role: '',
	},
};
