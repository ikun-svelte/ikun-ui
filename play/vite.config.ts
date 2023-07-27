import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import * as path from 'path';
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['components/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'ikun-ui': path.resolve(__dirname, '../components/index.ts')
		}
	}
});
