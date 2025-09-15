import axios, {type AxiosResponse, AxiosError } from 'axios';

const AUTH_USER_LS = 'auth-store';

export const createAxiosInstance = (baseURL: string) => {
	const instance = axios.create({
		baseURL,
	});

	instance.interceptors.request.use(
		function (config) {
			const authUser = localStorage.getItem(AUTH_USER_LS);
			if (authUser) {
				const authUserData = JSON.parse(authUser);
				const token = authUserData?.state?.token;
				if (token) {
					config.headers['Authorization'] = token;
				}
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		function (response: AxiosResponse) {
			return response;
		},
		function (error: AxiosError) {
			if ((error.response && error.response.status === 401) || (error.response && error.response.status === 403)) {
				localStorage.removeItem(AUTH_USER_LS);
				window.location.href = '/auth/login';
			}
			return Promise.reject(error);
		}
	);

	return instance;
};
