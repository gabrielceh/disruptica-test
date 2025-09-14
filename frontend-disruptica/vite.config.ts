import path from 'path';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@core': path.resolve(__dirname, './src/core'),
		},
	},
})
