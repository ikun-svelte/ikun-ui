// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['components/**/*.{test,spec}.{js,ts}']
	}
});
