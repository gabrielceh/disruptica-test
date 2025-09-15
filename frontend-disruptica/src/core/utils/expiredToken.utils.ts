import { jwtDecode } from 'jwt-decode';

export const hasTokenExp = (token: string): boolean => {
	try {
		const decoded = jwtDecode(token);
		if (decoded.exp && decoded.exp < Date.now() / 1000) {
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return true;
	}

};
