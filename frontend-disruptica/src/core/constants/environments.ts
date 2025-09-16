function getPublicEnv(key: string): string {
	const value = import.meta.env[key as keyof NodeJS.ProcessEnv];

	if (!value && import.meta.env.NODE_ENV === 'development') {
		console.warn(`⚠️ Environment variable "${key}" is not defined.`);
	}

	return value ?? '';
}

export const ENV = {
	backendUrl: getPublicEnv('VITE_BACKEND_URL'),
} as const;
