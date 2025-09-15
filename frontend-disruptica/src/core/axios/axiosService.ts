/* eslint-disable no-useless-catch */
import { ENV } from '../constants';
import { createAxiosInstance } from './axiosInstance';

export class AxiosService  {
    private static baseURL: string = ENV.backendUrl;
    private static instance = createAxiosInstance(this.baseURL);

	static async get({  path, signal }: { path: string; signal?: AbortSignal }) {
		try {

			const response = await this.instance.get(path, {
				signal: signal,
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async post<T>({ data, path, signal }: { path: string; data: T; signal?: AbortSignal }) {
		try {
			const response = await this.instance.post(path, data, {
				responseType: 'json',
				signal,
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async put<T>({ path, data, signal }: { path: string; data?: T; signal?: AbortSignal }) {
		try {
			const response = await this.instance.put(path, data, { signal });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async patch<T>({  data, path, signal }: { path: string; data?: T; signal?: AbortSignal }) {
		try {
			const response = await this.instance.patch(path, data, { signal });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	static async delete({ data = null, path, signal }: { path: string; data?: unknown; signal?: AbortSignal }) {
		try {
			const response = await this.instance.delete(path, { data, signal });
			return response.data;
		} catch (error) {
			throw error;
		}
	}
};


